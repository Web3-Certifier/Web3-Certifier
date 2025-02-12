// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {PriceConverter} from "./PriceConverter.sol";

enum Status {
    Started,
    // NeedsToBeCorrected,
    Cancelled,
    Ended
}

struct Exam {
    uint256 id;
    string name;
    string description;
    uint256 endTime;
    Status status;
    string[] questions;
    uint256[] answers;
    uint256 price; // in $
    uint256 baseScore;
    string imageUrl;
    address[] users;
    uint256 etherAccumulated;
    address certifier;
}

/**
 * A smart contract that allows certifiers to create exams and users to get certified with NFT certificates.
 * Prevents users from seeing other students' answers until they claim their NFT certificate.
 * Also prevents frontrunning attacks when users try to claim their NFT certificate.
 * @author Spyros Zikos
 */
contract Certifier is ERC721, ReentrancyGuard {
    using Strings for uint256;
    using Strings for address;
    using Strings for string;

    address[] private s_certifiers;
    mapping(address certifier => uint256[] examIds) private s_certifierToExamIds;
    address[] private s_users;
    mapping(address user => mapping(uint256 examId => bytes32 hashedAnswer)) private s_userToAnswers;
    // user can claim either ether if exam is cancelled or NFT if exam has ended
    mapping(address user => mapping(uint256 id => bool hasClaimed)) private s_userHasClaimed;

    mapping(uint256 id => Exam exam) private s_examIdToExam;
    uint256 private s_lastExamId; // starts from 0

    uint256 private s_tokenCounter;
    mapping(uint256 => string) private s_tokenIdToUri;

    uint256 private immutable i_timeToCorrectExam;
    address private immutable i_priceFeed;

    // Errors
    error Certifier__ExamEnded(uint256 examId);
    error Certifier__ExamAlreadyEnded(uint256 examId);
    error Certifier__ExamIsCancelled(uint256 examId);
    error Certifier__ExamIsNotCancelled(uint256 examId);
    error Certifier__NotTheTimeForExamCorrection(uint256 examId);
    error Certifier__TooSoonToCancelExam(uint256 examId);
    error Certifier__UserAlreadyClaimedNFT(uint256 examId);
    error Certifier__UserAlreadyClaimedCancelledExam(uint256 examId);
    error Certifier__NotEnoughEther(uint256 amountSent, uint256 examPrice);
    error Certifier__EtherTransferFailed();
    error Certifier__AnswerHashesDontMatch(bytes32 expected, bytes32 actual);
    error Certifier__WrongAnswers(uint256 expected, uint256 actual);
    error Certifier__UserFailedExam(uint256 userScore, uint256 examBaseScore);
    error Certifier__AnswersLengthDontMatch(uint256 correctAnswersLength, uint256 userAnswersLength);
    error Certifier__UserDidNotParticipate(uint256 examId);

    constructor(uint256 timeToCorrectExam, address priceFeed) ERC721("Certificate", "CERT") {
        i_timeToCorrectExam = timeToCorrectExam;
        i_priceFeed = priceFeed;
    }

    /**
     *
     * @param name The name of the exam
     * @param description The description of the exam
     * @param endTime The time the exam ends (unix timestamp)
     * @param questions The questions of the exam
     * @param price The cost of the exam for each student
     */
    function createExam(
        string memory name,
        string memory description,
        uint256 endTime, // (new Date()).getTime() in js
        string[] memory questions,
        uint256 price,
        uint256 baseScore,
        string memory imageUrl
    ) external payable {
        Exam memory exam = Exam({
            id: s_lastExamId,
            name: name,
            description: description,
            endTime: endTime,
            status: Status.Started,
            questions: questions,
            answers: new uint256[](0),
            price: price,
            baseScore: baseScore,
            imageUrl: imageUrl,
            users: new address[](0),
            etherAccumulated: 0,
            certifier: msg.sender
        });
        s_examIdToExam[s_lastExamId] = exam;
        s_certifierToExamIds[msg.sender].push(s_lastExamId);
        s_certifiers.push(msg.sender);
        s_lastExamId++;
    }

    /**
     *
     * @param hashedAnswer The hash of the answers and the secret number and msg.sender
     */
    function submitAnswers(bytes32 hashedAnswer, uint256 examId) external payable {
        if (block.timestamp > s_examIdToExam[examId].endTime) {
            revert Certifier__ExamEnded(examId);
        }
        uint256 usdValue = PriceConverter.getConversionRate(msg.value, i_priceFeed);
        if (usdValue < s_examIdToExam[examId].price) {
            revert Certifier__NotEnoughEther(usdValue, s_examIdToExam[examId].price);
        }
        s_examIdToExam[examId].etherAccumulated += msg.value;
        s_userToAnswers[msg.sender][examId] = hashedAnswer;
    }

    function correctExam(uint256 examId, uint256[] memory answers) external nonReentrant {
        if (
            block.timestamp < s_examIdToExam[examId].endTime
                || block.timestamp > s_examIdToExam[examId].endTime + i_timeToCorrectExam
        ) {
            revert Certifier__NotTheTimeForExamCorrection(examId);
        }
        if (s_examIdToExam[examId].status == Status.Ended) {
            revert Certifier__ExamAlreadyEnded(examId);
        }
        s_examIdToExam[examId].answers = answers;
        s_examIdToExam[examId].status = Status.Ended;
        (bool success,) = msg.sender.call{value: s_examIdToExam[examId].etherAccumulated}("");
        if (!success) {
            revert Certifier__EtherTransferFailed();
        }
        s_examIdToExam[examId].etherAccumulated = 0;
    }

    function cancelUncorrectedExam(uint256 examId) external {
        if (s_examIdToExam[examId].status == Status.Cancelled) {
            revert Certifier__ExamIsCancelled(examId);
        }
        if (s_examIdToExam[examId].status == Status.Ended) {
            revert Certifier__ExamEnded(examId);
        }
        if (block.timestamp <= s_examIdToExam[examId].endTime + i_timeToCorrectExam) {
            revert Certifier__TooSoonToCancelExam(examId);
        }
        s_examIdToExam[examId].status = Status.Cancelled;
    }

    function claimCertificate(uint256 examId, uint256[] memory answers, uint256 secretNumber) external {
        if (s_examIdToExam[examId].status != Status.Ended) {
            revert Certifier__ExamIsCancelled(examId);
        }
        if (s_userHasClaimed[msg.sender][examId]) {
            revert Certifier__UserAlreadyClaimedNFT(examId);
        }
        uint256 userAnswersAsNumber = getAnswerAsNumber(answers);
        bytes32 expectedHashedAnswer = keccak256(abi.encodePacked(userAnswersAsNumber, secretNumber, msg.sender));
        if (expectedHashedAnswer != s_userToAnswers[msg.sender][examId]) {
            revert Certifier__AnswerHashesDontMatch(expectedHashedAnswer, s_userToAnswers[msg.sender][examId]);
        }
        uint256 score = getScore(s_examIdToExam[examId].answers, answers);
        if (score < s_examIdToExam[examId].baseScore) {
            revert Certifier__UserFailedExam(score, s_examIdToExam[examId].baseScore);
        }

        s_userHasClaimed[msg.sender][examId] = true;

        string memory tokenUri = makeTokenUri(examId, score);
        s_tokenIdToUri[s_tokenCounter] = tokenUri;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
    }

    /**
    * Refund the price of the cancelled exam to the user
    * @param examId The id of the exam
    */
    function refundExam(uint256 examId) external nonReentrant {
        if (s_examIdToExam[examId].status != Status.Cancelled) {
            revert Certifier__ExamIsNotCancelled(examId);
        }
        if (s_userToAnswers[msg.sender][examId] == "") {
            revert Certifier__UserDidNotParticipate(examId);
        }
        if (s_userHasClaimed[msg.sender][examId]) {
            revert Certifier__UserAlreadyClaimedCancelledExam(examId);
        }
        s_userHasClaimed[msg.sender][examId] = true;
        (bool success,) = msg.sender.call{value: s_examIdToExam[examId].price}("");
        if (!success) {
            revert Certifier__EtherTransferFailed();
        }
    }

    /*//////////////////////////////////////////////////////////////
                           HELPER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getAnswerAsNumber(uint256[] memory answers) private pure returns (uint256) {
        uint256 result = 0;
        for (uint256 i = 0; i < answers.length; i++) {
            result += answers[i] * (10 ** i);
        }
        return result;
    }

    function getScore(uint256[] memory correctAnswers, uint256[] memory userAnswers) private pure returns (uint256) {
        uint256 score = 0;
        if (correctAnswers.length != userAnswers.length) {
            revert Certifier__AnswersLengthDontMatch(correctAnswers.length, userAnswers.length);
        }
        for (uint256 i = 0; i < correctAnswers.length; i++) {
            if (correctAnswers[i] == userAnswers[i]) {
                score++;
            }
        }
        return score;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function makeTokenUri(uint256 examId, uint256 score) private view returns (string memory) {
        string memory tokenId = s_tokenCounter.toString();
        string memory examName = s_examIdToExam[examId].name;
        string memory examDescription = s_examIdToExam[examId].description;
        string memory scoreStr = score.toString();
        string memory numOfQuestions = s_examIdToExam[examId].questions.length.toString();
        string memory base = s_examIdToExam[examId].baseScore.toString();
        string memory certifier = s_examIdToExam[examId].certifier.toHexString();
        string memory imageUrl = s_examIdToExam[examId].imageUrl;

        return string(
            abi.encodePacked(
                _baseURI(),
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name": "', name(), " #", tokenId,
                            '", "description": "An NFT that represents a certificate.", ',
                            '"attributes":[',
                            '{"trait_type": "exam_name", "value": "', examName, '"}, ',
                            '{"trait_type": "exam_description", "value": "', examDescription, '"}, ',
                            '{"trait_type": "my_score", "value": "', scoreStr, "/", numOfQuestions, '"}, ',
                            '{"trait_type": "exam_base_score", "value": ', base, "}, ",
                            '{"trait_type": "certifier", "value": "', certifier, '"}',
                            '], "image": "', imageUrl, '"}'
                        )
                    )
                )
            )
        );
    }

    /*//////////////////////////////////////////////////////////////
                           GETTER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getCertifiers() public view returns (address[] memory) {
        return s_certifiers;
    }

    function getCertifier(uint256 index) public view returns (address) {
        return s_certifiers[index];
    }

    function getCertifierExams(address certifier) public view returns (uint256[] memory) {
        return s_certifierToExamIds[certifier];
    }

    function getUsers() public view returns (address[] memory) {
        return s_users;
    }

    function getUser(uint256 index) public view returns (address) {
        return s_users[index];
    }

    function getUserAnswer(address user, uint256 examId) external view returns (bytes32) {
        return s_userToAnswers[user][examId];
    }

    function getUserHasClaimed(address user, uint256 examId) external view returns (bool) {
        return s_userHasClaimed[user][examId];
    }

    function getExam(uint256 id) public view returns (Exam memory) {
        return s_examIdToExam[id];
    }

    function getLastExamId() external view returns (uint256) {
        return s_lastExamId;
    }

    function getTimeToCorrectExam() external view returns (uint256) {
        return i_timeToCorrectExam;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return s_tokenIdToUri[tokenId];
    }
}
