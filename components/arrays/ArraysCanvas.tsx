"use client"
import useArraysProvider from "@/hooks/useArraysProvider";
import { generateArrays } from "@/utils/arrays";
import { useEffect, useRef } from "react"


const ArraysCanvas = () => {
    const { svgRef, insertNewElement } = useArraysProvider();
    useEffect(() => {
        if (svgRef?.current === null) return;
        const width = svgRef?.current.clientWidth;
        const height = svgRef?.current.clientHeight;

    }, [])
    return (
        <svg ref={svgRef} className="flex flex-col w-full h-screen bg-zinc-800"></svg>
    )
}

export default ArraysCanvas