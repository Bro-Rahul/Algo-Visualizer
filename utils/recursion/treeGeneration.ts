import { FunctionCallStackType } from "@/types/recursion";
import * as d3 from "d3";
import { RefObject } from "react";

export function drawTree(svgRef: RefObject<SVGSVGElement | null>, treeData: FunctionCallStackType<any, any>) {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("g").remove();
    const grp = svg.append("g")
        .attr("transform", "translate(100,100)")

    const root = d3.hierarchy<FunctionCallStackType<any, any>>(treeData);

    const treeLayout = d3
        .tree<FunctionCallStackType<any, any>>()
        .nodeSize([100, 150])
    const tree = treeLayout(root);

    grp.attr("transform", `translate(${100}, ${100})`);


    const linkGenerator = d3.linkVertical<
        d3.HierarchyPointLink<FunctionCallStackType<any, any>>,
        d3.HierarchyPointNode<FunctionCallStackType<any, any>>
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

}