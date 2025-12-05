"use client"
import Controller from "@/components/recursion/Controller"
import RecursionCanvas from "@/components/recursion/RecursionCanvas";
import DisplayFunctionCallStack from "@/components/recursion/DisplayFunctionCallStack";
import useCodeParser from "@/hooks/useCodeParser";


const page = () => {
    const { functionMetaDetails, recursionData, setResults, setListOfParameters, setInputsParameterValue } = useCodeParser();
    return (
        <section className="flex flex-col w-full h-screen overflow-hidden bg-primary relative">
            <Controller
                functionMetaDetails={functionMetaDetails}
                handleSetResult={setResults}
                handleCodeSubmit={setListOfParameters}
                handleSetInputParameters={setInputsParameterValue}
            />
            <RecursionCanvas
                treeData={recursionData}
            />
            <DisplayFunctionCallStack
                functionName={functionMetaDetails.functionName}
                treeData={recursionData}
            />
        </section>
    )
}

export default page

function fib(n: number): number {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

function fibDp(n: number, memo: number[]): number {
    if (n <= 1) return n;
    if (memo[n] !== undefined) return memo[n];

    memo[n] = fibDp(n - 1, memo) + fibDp(n - 2, memo);
    return memo[n];
}