"use client"
import ArraysCanvas from "@/components/arrays/ArraysCanvas"
import ArraysOperationMenus from "@/components/arrays/ArraysOperationMenus";
import SortingController from "@/components/arrays/SortingController";
import { useState } from "react";

const page = () => {
    // here the lineNumber is Use to highlight the psudocode to which out algo is running so we can also use it to check weather it is sorting or not -1 for not sorting val >-1 is for sorting.
    const [lineNumber, setLineNumber] = useState<number>(-1);
    const highlightLineNumber = (lineNumber: number) => {
        setLineNumber(lineNumber);
    }
    return (
        <div className="flex w-full h-screen gap-2">
            <ArraysOperationMenus isSorting={lineNumber !== -1} />
            <ArraysCanvas />
            <SortingController highlightCurrentLine={highlightLineNumber} currentLine={lineNumber} />
        </div>
    )
}

export default page