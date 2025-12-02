"use client"
import Controller from "@/components/recursion/Controller"
import { FunctionStateCapture } from "@/utils/recursion";
import { useEffect, useState } from "react";
import { FunctionCallStackType } from "@/types/recursion";
import RecursionCanvas from "@/components/recursion/RecursionCanvas";
import * as d3 from "d3";
import useRecursion from "@/hooks/useRecursion";
import DisplayFunctionCallStack from "@/components/recursion/DisplayFunctionCallStack";


const page = () => {

    const { svgRef, functionState } = useRecursion();
    const data = functionState.getFunctionCaptureStates();

    /*     useEffect(() => {
            const fibonacciDP = (n: number, memo: number[]): number => {
                // Base cases
                if (n <= 1) return n;
    
                // If value already computed → return memoized result
                if (memo[n] !== undefined) {
                    return memo[n];
                }
    
                // Recursively compute with memoization
                memo[n] = wrapperFunction(n - 1, memo) + wrapperFunction(n - 2, memo);
    
                return memo[n];
            };
    
            if (!svgRef.current) return;
    
            const svg = d3.select(svgRef.current);
            const width = svgRef.current.clientWidth
            const height = svgRef.current.clientHeight - 50
    
            const grp = svg.append('g')
    
    
            const wrapperFunction = getWrapperfunction();
            wrapperFunction(10, []);
    
            const hierarchyData = getHierarchyData()
    
            type InputType = Parameters<typeof fibonacciDP>;
            type OutputType = ReturnType<typeof fibonacciDP>
            const root = d3.hierarchy<FunctionCallStackType<InputType, OutputType>>(hierarchyData);
            const treeLayout = d3
                .tree<FunctionCallStackType<InputType, OutputType>>()
                .nodeSize([50, 150])
            const tree = treeLayout(root);
    
            const nodes = tree.descendants();
            const xVals = nodes.map(n => n.x);
            const yVals = nodes.map(n => n.y);
    
            const minX = Math.min(...xVals);
            const maxX = Math.max(...xVals);
            const minY = Math.min(...yVals);
            const maxY = Math.max(...yVals);
    
            const treeWidth = maxX - minX;
            const treeHeight = maxY - minY;
    
            // Center offsets
            const offsetX = (width - treeWidth) / 2 - minX;
            const offsetY = (height - treeHeight) / 2 - minY;
            grp.attr("transform", `translate(${offsetX}, ${offsetY})`);
    
    
            const linkGenerator = d3.linkVertical<
                d3.HierarchyPointLink<FunctionCallStackType<InputType, OutputType>>,
                d3.HierarchyPointNode<FunctionCallStackType<InputType, OutputType>>
            >()
                .x(d => d.x)
                .y(d => d.y);
    
    
            const circle = grp.selectAll("circle")
                .data(tree.descendants())
                .join("circle")
                .attr("cx", (d, i) => d.x)
                .attr("cy", (d, i) => d.y)
                .attr("r", 10)
                .attr("fill", "red")
    
            grp.selectAll("path")
                .data(tree.links())
                .join("path")
                .attr("d", linkGenerator)
                .attr("fill", "none")
                .attr("stroke", "#ccc")
                .attr("stroke-width", 1.5);
        }, []);
     */
    return (
        <section className="flex flex-col w-full h-screen overflow-hidden bg-primary relative">
            <Controller />
            <RecursionCanvas svgRef={svgRef} />
            <DisplayFunctionCallStack data={data} />
        </section>
    )
}

export default page