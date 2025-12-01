"use client"
import Controller from "@/components/recursion/Controller"
import { FunctionStateCapture } from "@/utils/recursion";
import { useEffect, useState } from "react";
import { FunctionCallStackType } from "@/types/recursion";
import RecursionCanvas from "@/components/recursion/RecursionCanvas";
import * as d3 from "d3";


const page = () => {

    const [data, setData] = useState<any[]>([]);
    /* useEffect(() => {

        const svg = d3.select("#tree-canvas");
        const width = svg.attr("width")
        const height = svg.attr("height")
        function fib(num: number): number {
            if (num <= 1) return num;
            return fibCaptureWrapper(num - 1) + fibCaptureWrapper(num - 2);
        }


        // 1. Update the function signature to accept a single object 'args'
        const fibonacciDP = (n: number, memo: number[]): number => {
            // 2. Destructure the arguments inside the function


            // 1. Base Cases
            if (n <= 0) {
                return 0;
            }
            if (n === 1 || n === 2) {
                return 1;
            }

            // 2. Lookup (Memoization Check)
            if (memo[n] !== undefined) {
                return memo[n];
            }

            // 3. Recursive Call and Store Result
            // Pass the arguments back as a single object for recursive calls
            const result = fibDpCaptureWrapper(n - 1, memo) + fibDpCaptureWrapper(n - 2, memo);

            // Store the computed result in the memo array at index n.
            memo[n] = result;

            return result;
        }

        const fibCapture = new FunctionStateCapture<typeof fib>();
        const fibDpCapture = new FunctionStateCapture<typeof fibonacciDP>();

        const fibCaptureWrapper = fibCapture.withfunctionStates(fib);
        const fibDpCaptureWrapper = fibDpCapture.withfunctionStates(fibonacciDP);

        fibCaptureWrapper(10)
        type FunctionParamsType = Parameters<typeof fib>
        type FunctionReturnType = ReturnType<typeof fib>





        const hierarchyData = state.getStateVal()[0]
        const root = d3.hierarchy<FunctionCallStackType<number, number>>(hierarchyData);
        const treeLayout = d3.tree<FunctionCallStackType<number, number>>().size([1000, 800]);
        const tree = treeLayout(root);

        const hierarchyData = fibCapture.getStateVal()[0]
        const root = d3.hierarchy<FunctionCallStackType<FunctionParamsType, FunctionReturnType>>(hierarchyData);
        const treeLayout = d3.tree<FunctionCallStackType<FunctionParamsType, FunctionReturnType>>().size([1000, 800]);
        const tree = treeLayout(root);

        const circle = svg.selectAll("circle")
            .data(tree.descendants())
            .join("circle")
            .attr("cx", (d, i) => d.x)
            .attr("cy", (d, i) => d.y)
            .attr("r", 10)
            .attr("fill", "red")


        // --- D3 Rendering Section ---

        // 1. Define the raw data type inside the node
        type NodeDatum = FunctionCallStackType<
            Parameters<typeof fib>,
            ReturnType<typeof fib>
        >;

        type LinkDatum = d3.HierarchyPointNode<NodeDatum>;

        // 2. Fix the HierarchyPointNode generic to satisfy the two-argument requirement

        d3.linkVertical < ()
        const linkGenerator = d3.linkVertical<NodeDatum, LinkDatum>()
            .x(d => d.x)
            .y(d => d.y);

        const links = tree.links();

        // 2. FIX: Draw the paths by passing the entire link object 'd'
        svg.selectAll("path")
            .data(tree.links())   // automatically LinkDatum[]
            .join("path")
            .attr("d", d => linkGenerator(d))
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1.5);
    }, []); */


    return (
        <section className="flex flex-col w-full h-screen overflow-hidden bg-primary relative">
            <Controller />
            <RecursionCanvas />
        </section>
    )
}

export default page