import useRecursionCanvas from "@/hooks/useRecursionCanvas";
import { FunctionCallStackType } from "@/types/recursion";

interface RecursionCanvasProps {
    treeData: FunctionCallStackType<any, any> | null
}

const RecursionCanvas = ({ treeData }: RecursionCanvasProps) => {
    const { containerRef, svgRef } = useRecursionCanvas(treeData)
    return (
        <div
            ref={containerRef}
            className="relative w-full h-full recursion-canvas"
        >
            <svg
                ref={svgRef}
                id="recursion-canvas"
                className="absolute top-0 left-0 overflow-visible"
            ></svg>
        </div>
    );
};

export default RecursionCanvas;
