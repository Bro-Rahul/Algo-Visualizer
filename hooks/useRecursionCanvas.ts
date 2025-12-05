import { FunctionCallStackType } from '@/types/recursion';
import { DrawTree, drawTree, drawTreeAnimated } from '@/utils/recursion/treeGeneration';
import React, { useEffect, useRef } from 'react'

const useRecursionCanvas = (treeData: FunctionCallStackType<any, any> | null) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
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
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            container.removeEventListener("mousedown", onMouseDown);
            container.removeEventListener("wheel", onWheel);
        };
    }, []);

    useEffect(() => {
        if (treeData) {
            const treeGeneration = new DrawTree(treeData);
            treeGeneration.drawTree()
        }
    }, [treeData]);

    return {
        svgRef,
        containerRef
    }
}

export default useRecursionCanvas