import React, { useRef, useEffect } from "react";

interface RecursionCanvasProps {
    svgRef: React.RefObject<SVGSVGElement | null>;
}

const RecursionCanvas = ({ svgRef }: RecursionCanvasProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const state = useRef({
        isPanning: false,
        startX: 0,
        startY: 0,
        translateX: 0,
        translateY: 0,
        scale: 1,
    });

    useEffect(() => {
        const container = containerRef.current;
        const svg = svgRef.current;
        if (!container || !svg) return;

        const s = state.current;

        const onMouseDown = (e: MouseEvent) => {
            s.isPanning = true;
            s.startX = e.clientX - s.translateX;
            s.startY = e.clientY - s.translateY;
            container.style.cursor = "grabbing";
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!s.isPanning) return;
            s.translateX = e.clientX - s.startX;
            s.translateY = e.clientY - s.startY;
            svg.style.transform = `translate(${s.translateX}px, ${s.translateY}px) scale(${s.scale})`;
        };

        const onMouseUp = () => {
            s.isPanning = false;
            container.style.cursor = "grab";
        };

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const zoomFactor = 0.1;
            s.scale += e.deltaY > 0 ? -zoomFactor : zoomFactor;
            s.scale = Math.min(Math.max(0.2, s.scale), 4);
            svg.style.transform = `translate(${s.translateX}px, ${s.translateY}px) scale(${s.scale})`;
        };

        container.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        container.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            container.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            container.removeEventListener("wheel", onWheel);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full"
            style={{
                overflow: "hidden",
                cursor: "grab",
                backgroundColor: "#0f0f0f",
                backgroundImage: `
                    linear-gradient(#2a2a2a 1px, transparent 1px),
                    linear-gradient(90deg, #2a2a2a 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
            }}
        >
            <svg
                ref={svgRef}
                id="canvas"
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    overflow: "visible",
                }}
            ></svg>
        </div>
    );
};

export default RecursionCanvas;
