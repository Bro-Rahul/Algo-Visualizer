import { FunctionCallStackType } from '@/types/recursion';
import { FunctionStateCapture, getFunctionMetaDetails } from '@/utils/recursion';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react'

// implment the logic first that how will i create an parse the tree forget about the function manipulation step for now 

const useRecursion = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const functionState = new FunctionStateCapture();

    const getWrapperfunction = (fn: (n: number, memo: number[]) => number) => {
        return functionState.getWrapperfunction(fn);;
    }

    const getHierarchyData = () => {
        return functionState.getHierarchyData();
    }


    useEffect(() => {


        const fibonacciDP = (n: number, memo: number[]): number => {
            if (n <= 1) return n;
            memo[n] = wrapperFunction(n - 1, memo) + wrapperFunction(n - 2, memo);
            return memo[n];
        };

        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const width = svgRef.current.clientWidth
        const height = svgRef.current.clientHeight - 50

        const grp = svg.append('g')


        const wrapperFunction = getWrapperfunction(fibonacciDP);
        wrapperFunction(8, []);

        const hierarchyData = getHierarchyData()

        type InputType = Parameters<typeof fibonacciDP>;
        type OutputType = ReturnType<typeof fibonacciDP>
        const root = d3.hierarchy<FunctionCallStackType<InputType, OutputType>>(hierarchyData);
        getFunctionMetaDetails(wrapperFunction, hierarchyData)

        const treeLayout = d3
            .tree<FunctionCallStackType<InputType, OutputType>>()
            .nodeSize([100, 150])
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


        const circles = grp.selectAll("circle")
            .data(tree.descendants())
            .join("circle")
            .attr("cx", (d, i) => d.x)
            .attr("cy", (d, i) => d.y)
            .attr("r", 20)
            .attr("stroke", "#ccc")
            .attr("stroke-width", 3);


        grp.selectAll('text')
            .data(tree.descendants())
            .join("text")
            .text(d => `ID ${d.data.id}`)
            .attr("x", d => d.x - 3 * 20)
            .attr("y", d => d.y)
            .attr('fill', 'white')

        grp.selectAll("path")
            .data(tree.links())
            .join("path")
            .attr("d", linkGenerator)
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 2);
    }, []);




    return {
        svgRef,
        functionState,
        getWrapperfunction,
        getHierarchyData
    }

}

export default useRecursion