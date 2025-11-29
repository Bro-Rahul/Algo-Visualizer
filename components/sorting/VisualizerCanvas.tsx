import useArraysProvider from "@/hooks/useArraysProvider";
import { generateArrays } from "@/utils/arrays";
import { forwardRef, useEffect, useRef } from "react";

interface Props {
    elements: number[];
    svgRef: React.RefObject<SVGSVGElement | null>
}

const VisualizerCanvas = ({ elements, svgRef }: Props) => {
    useEffect(() => {
        if (svgRef === null || svgRef.current === null) return;
        generateArrays(elements);
    }, [elements]);
    return (
        <svg id="canvas" ref={svgRef} className="w-full h-full"></svg>
    );
}
export default VisualizerCanvas;
