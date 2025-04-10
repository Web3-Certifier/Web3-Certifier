"use client";

import React from "react";
import { createRef, useCallback, useState } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { Button, Title, Input, Text, TextArea, PageWrapper } from "~~/components";
import { useDropzone } from "react-dropzone";
import { singleUpload } from "~~/services/ipfs";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { defaultImage } from "~~/utils/constants/constants";


const CreateExam = () => {
    const router = useRouter();
    const [questions, setQuestions] = useState<string[]>([""]);
    const [examName, setExamName] = useState<string>("");
    const [examDescription, setExamDescription] = useState<string>("");
    const [examEndTime, setExamEndTime] = useState<string>("");
    const [examPrice, setExamPrice] = useState<number>();
    const [examBaseScore, setExamBaseScore] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    const requiredDetailsAreFilled = () => {
        return examName&&examDescription&&examEndTime&&examBaseScore&&questions[0];
    }

    // Get exam creation fee (in $)
    const { data: examCreationFee } = useScaffoldReadContract({
        contractName: "Certifier",
        functionName: "getExamCreationFee"
    });
    // Get exam creation fee (in ETH)
    const { data: examCreationFeeInEth } = useScaffoldReadContract({
        contractName: "Certifier",
        functionName: "getUsdToEthRate",
        args: [examCreationFee ? examCreationFee : BigInt(0)],
    });

    const { writeContractAsync: createExam } = useScaffoldWriteContract("Certifier");
    const handleCreateExam = async () => {
        console.log("Exam creation begun");
        try {
        await createExam(
            {
            functionName: "createExam",
            args: [
                examName,
                examDescription,
                BigInt(new Date(examEndTime.toString()).getTime() / 1000),
                questions,
                examPrice ? BigInt(examPrice * 1e18) : BigInt(0),
                BigInt(examBaseScore),
                imageUrl || defaultImage
            ],
            value: examCreationFeeInEth,
            },
            {
            onBlockConfirmation: res => {
                console.log("block confirm", res);
                router.push(`/`);
            },
            },
        );
        } catch (error) {
          console.log("create exam error", error);
        }
    };
    
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            const returnedImageUrl = await singleUpload(file, file.name);
            setImageUrl(returnedImageUrl);
            console.log("Uploaded image url: ", returnedImageUrl);
        }, []
    );

    const { getRootProps } = useDropzone({ onDrop, accept: { "image/*": [] } });
    const dropZoneRef: React.LegacyRef<HTMLDivElement> | undefined = createRef();

    const labelMarginAndPadding = 'm-2 mt-4 block';

    return (
        <PageWrapper>
            <Title>Create Exams</Title>
            <div>
                <label className={`${labelMarginAndPadding}`}>Name *</label>
                <Input
                    value={examName}
                    type="text"
                    placeholder="Name"
                    onChange={(e: any) => {
                        setExamName(e.target.value);
                    }}
                />
                <label className={`${labelMarginAndPadding}`}>Description *</label>
                <Input
                    value={examDescription}
                    type="text"
                    placeholder="Description"
                    onChange={(e: any) => {
                        setExamDescription(e.target.value);
                    }}
                />
                <label className={`${labelMarginAndPadding}`}>End Time *</label>
                <Input
                    value={examEndTime}
                    type="datetime-local"
                    onChange={(e: any) => {
                        setExamEndTime(e.target.value);
                    }}
                />
                <label className={`${labelMarginAndPadding}`}>Price ($)</label>
                <Input
                    value={examPrice}
                    type="number"
                    placeholder="Price"
                    onChange={(e: any) => {
                        if (e.target.value >= 0)
                        setExamPrice(e.target.value);
                    }}
                />
                <label className={`${labelMarginAndPadding}`}>Base Score *</label>
                <Input
                    value={examBaseScore}
                    className="mb-4"
                    type="number"
                    placeholder="Base Score"
                    onChange={(e: any) => {
                        setExamBaseScore(e.target.value);
                    }}
                />
                <label className={`${labelMarginAndPadding}`}>Questions *</label>
                {questions.map((question, indx) => (
                    <TextArea
                    key={indx}
                    value={question}
                    placeholder={`Question ${indx+1}`}
                    onChange={(e: any) => {
                        setQuestions(questions.map((q, n) => n===indx?e.target.value:q));
                    }}
                />
                ))}

                <Button onClick={() => setQuestions([...questions, ""])}>
                    Add Question
                </Button>
                <Button onClick={() => { if (questions.length > 1) setQuestions([...questions.slice(0, -1)]) }}>
                    Remove Question
                </Button>

                <label className={`${labelMarginAndPadding} block`}>Image</label>
                <div className="ml-2 my-4 w-[350px] border border-gray-300 rounded-lg">
                    <div
                        {...getRootProps()}
                        ref={dropZoneRef}
                        className="m-auto my-4 w-[300px] min-h-96 bg-neutral flex justify-center items-center rounded-lg"
                    >
                        {imageUrl ?
                        (
                            <div className="self-center flex justify-center items-center w-full h-full">
                                <img src={imageUrl} className="max-w-full max-h-full" />
                            </div>
                        ) :
                        (
                            <div className="self-center flex flex-col justify-center ">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="text-gray-300">Upload Image</div>
                            </div>
                        )}
                    </div>

                    <div className="m-auto divider my-4 max-w-[300px]">OR</div>
                        <Input
                            placeholder="https://ipfs.io/pathToImage.jpg"
                            value={imageUrl}
                            onChange={(e: any) => setImageUrl(e.target.value)}
                            className='m-auto my-4'
                    />
                </div>

                {!requiredDetailsAreFilled() && <Text mt="10" color="red" display="block">* Fields are required</Text>}
                <Button disabled={!requiredDetailsAreFilled()} onClick={handleCreateExam} className="block mt-8">
                    Create Exam
                </Button>
                <Text mt="3" ml="2" color="grey" display="block">Exam Creation Fee: $2</Text>
            </div>
        </PageWrapper>
    )
}

export default CreateExam;