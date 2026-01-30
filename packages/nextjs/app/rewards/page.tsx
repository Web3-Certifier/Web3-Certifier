"use client";

import { lazy, Suspense } from 'react'
import { wagmiReadFromContract } from "~~/hooks/wagmi/wagmiRead";
import { useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import { ZERO_ADDRESS } from "~~/constants";
import { useNonUndefinedAccount } from "~~/utils/NonUndefinedAccount";
import { Spinner } from "~~/components";

const CreateReward = lazy(() => import("./pages/CreateReward"));
const ManageReward = lazy(() => import("./pages/ManageReward"));

const Page = () => {
    const { address } = useNonUndefinedAccount();

    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const idParam = searchParams.get("id")!;

    if (!idParam || isNaN(Number(idParam)))
        return <div className="text-red-500 mx-auto mt-8">Invalid or missing exam ID.</div>;

    const id = BigInt(idParam);

    const NotOrganizerMessage = () => (
        <div className="text-red-500 mx-auto mt-8">You are not the organizer!!!</div>
    );

    /*//////////////////////////////////////////////////////////////
                          READ FROM CONTRACT
    //////////////////////////////////////////////////////////////*/
    
    const exam: Exam | undefined  = wagmiReadFromContract({
        functionName: "getExam",
        args: [id],
    }).data;

    const rewardAddress = wagmiReadFromContract({
        contractName: "RewardFactory",
        functionName: "getRewardByExamId",
        args: [id],
    }).data;

    if (!exam) return <Spinner />
    
    return (
        <>
            {exam?.certifier !== address && <NotOrganizerMessage />}
            {rewardAddress !== ZERO_ADDRESS ?
                <Suspense fallback={<Spinner />}>
                    <ManageReward id={id} />
                </Suspense>
                :
                <Suspense fallback={<Spinner />}>
                    <CreateReward id={id} />
                </Suspense>
            }
        </>
    )    
}

export default Page;
