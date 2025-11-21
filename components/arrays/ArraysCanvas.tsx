"use client"
import useArraysProvider from "@/hooks/useArraysProvider";


const ArraysCanvas = () => {
    const { svgRef } = useArraysProvider();
    return (
        <svg ref={svgRef} className="flex flex-col w-full h-screen bg-zinc-800"></svg>
    )
}

export default ArraysCanvas