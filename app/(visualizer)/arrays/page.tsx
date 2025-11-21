"use client"
import ArraysCanvas from "@/components/arrays/ArraysCanvas"
import ArraysOperationMenus from "@/components/arrays/ArraysOperationMenus";
import PsudoCodeViewer from "@/components/arrays/PsudoCodeViewer";
import SelectSortingAlgo from "@/components/arrays/SelectSortingAlgo";
import { Button } from "@/components/ui/button";
import useArraysProvider from "@/hooks/useArraysProvider"
import { useState, Activity } from "react";

const page = () => {
    const { elements, sortingStrategy } = useArraysProvider();
    const [lineNumber, setLineNumber] = useState<number>(-1);


    const highlightLineNumber = (lineNumber: number) => {
        setLineNumber(lineNumber);
    }

    const handleSort = async () => {
        await sortingStrategy.performSorting(elements, highlightLineNumber)
    }
    return (
        <div className="flex w-full h-screen">
            <ArraysOperationMenus isSorting={lineNumber !== -1} />
            <ArraysCanvas />
            <PsudoCodeViewer psudoCode={sortingStrategy.sorter.psudoCode} highlightLine={lineNumber} isAlgoRunning={lineNumber !== -1} />
            <SelectSortingAlgo>
                <Button onClick={handleSort} className="px-5 py-2 cursor-pointer bg-white text-black rounded-xl ">Sort</Button>
            </SelectSortingAlgo>
        </div>
    )
}

export default page