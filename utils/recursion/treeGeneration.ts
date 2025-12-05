import { FunctionCallStackType } from "@/types/recursion";
import * as d3 from "d3";
import { RefObject } from "react";



export class DrawTree {
    rawTreeData: FunctionCallStackType<any, any>
    root: d3.HierarchyNode<FunctionCallStackType<any, any>>
    tree: d3.HierarchyPointNode<FunctionCallStackType<any, any>>;
    linkGenerator;

    constructor(rawTreeData: FunctionCallStackType<any, any>) {
        this.rawTreeData = rawTreeData;
        this.root = d3.hierarchy<FunctionCallStackType<any, any>>(rawTreeData);
        const treeLayout = d3
            .tree<FunctionCallStackType<any, any>>()
            .nodeSize([100, 150])
        this.tree = treeLayout(this.root);

        this.linkGenerator = d3.linkVertical<
            d3.HierarchyPointLink<FunctionCallStackType<any, any>>,
            d3.HierarchyPointNode<FunctionCallStackType<any, any>>
        >()
            .x(d => d.x)
            .y(d => d.y);
    }

    static onClickEvent(grp: d3.Selection<SVGGElement, unknown, HTMLElement, any>, d: d3.HierarchyPointNode<FunctionCallStackType<any, any>>) {
        if (!d.children) return;
        const nodes = grp.selectAll(`.node_${d.data.parent}_childrens`)
            .data(d.children)
            .join("circle")
            .attr("class", d => `.node_${d.data.id}`)
            .attr("cx", (d, i) => d.x)
            .attr("cy", (d, i) => d.y)
            .attr("r", 20)
            .attr("stroke", "#ccc")
            .attr("stroke-width", 3)
            .attr("fill", d => d.height === 0 ? "green" : "yellow")

        nodes.on("click", (e: MouseEvent, d) => {
            grp.call(DrawTree.onClickEvent, d)
        });
    }

    drawTree() {
        const svg = d3.select("#recursion-canvas")
        svg.selectAll("g").remove();
        const grp = svg.append("g")
            .attr("transform", "translate(1000,100)")


        const root = this.tree.descendants()[0];

        const rootNode = grp.selectAll("circle")
            .data([root])
            .join("circle")
            .attr("class", d => `.node_${d.data.id}`)
            .attr("cx", (d, i) => d.x)
            .attr("cy", (d, i) => d.y)
            .attr("r", 20)
            .attr("stroke", "#ccc")
            .attr("stroke-width", 3)
            .attr("fill", "red")


        rootNode.on("click", (e: MouseEvent, d) => {
            grp.call(DrawTree.onClickEvent, d)
        });

        /*  grp.selectAll('text')
         .data(this.tree.descendants())
         .join("text")
         .text(d => `ID ${d.data.id}`)
         .attr("x", d => d.x - 3 * 20)
         .attr("y", d => d.y)
         .attr('fill', 'white')
 
     grp.selectAll("path")
         .data(this.tree.links())
         .join("path")
         .attr("d", this.linkGenerator)
         .attr("fill", "none")
         .attr("stroke", "#ccc")
         .attr("stroke-width", 2); */
    }

    static drawChildrens(grp: d3.Selection<SVGGElement, unknown, null, undefined>, nodes: d3.HierarchyPointNode<FunctionCallStackType<any, any>>[]) {

        grp.selectAll(`node-${nodes[0].data.parent}-child`)
            .data(nodes)
            .join("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 20)
            .attr("stroke", "#ccc")
            .attr("stroke-width", 3)
            .attr("fill", d => d.height === 0 ? "green" : null)
            .on("click", (event, d) => {
                grp.call((element) => {
                    if (d.children) {
                        element.call(drawChildrens, d.children);
                    }
                });
            })
    }
}

export function drawTree(svgRef: RefObject<SVGSVGElement | null>, treeData: FunctionCallStackType<any, any>) {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("g").remove();
    const grp = svg.append("g")
        .attr("transform", "translate(1000,100)")

    const root = d3.hierarchy<FunctionCallStackType<any, any>>(treeData);

    const treeLayout = d3
        .tree<FunctionCallStackType<any, any>>()
        .nodeSize([100, 150])
    const tree = treeLayout(root);

    console.log(root.descendants());
    console.log(root.links())

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

export function drawTreeAnimated(svgRef: RefObject<SVGSVGElement | null>, treeData: FunctionCallStackType<any, any>) {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("g").remove();
    const grp = svg.append("g")
        .attr("transform", "translate(1000,100)")

    const root = d3.hierarchy<FunctionCallStackType<any, any>>(treeData);

    const treeLayout = d3
        .tree<FunctionCallStackType<any, any>>()
        .nodeSize([100, 150])
    const tree = treeLayout(root);

    const nodes = tree.descendants();
    const links = tree.links();

    const linkGenerator = d3.linkVertical<
        d3.HierarchyPointLink<FunctionCallStackType<any, any>>,
        d3.HierarchyPointNode<FunctionCallStackType<any, any>>
    >()
        .x(d => d.x)
        .y(d => d.y);

    console.log(nodes[0])

    const rootNode = grp.selectAll("circle")
        .data([nodes[0]])
        .join("circle")
        .attr("class", d => `node-${d.data.id}`)
        .attr("cx", nodes[0].x)
        .attr("cy", nodes[0].y)
        .attr("r", 20)
        .attr("stroke", "#ccc")
        .attr("stroke-width", 3)

    rootNode.on("click", (event, d) => {
        grp.call((element) => {
            if (d.children) {
                element.call(drawChildrens, d.children);
            }
        });
    })
}




function drawChildrens(grp: d3.Selection<SVGGElement, unknown, null, undefined>, nodes: d3.HierarchyPointNode<FunctionCallStackType<any, any>>[]) {

    grp.selectAll(`node-${nodes[0].data.parent}-child`)
        .data(nodes)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 20)
        .attr("stroke", "#ccc")
        .attr("stroke-width", 3)
        .attr("fill", d => d.height === 0 ? "green" : null)
        .on("click", (event, d) => {
            grp.call((element) => {
                if (d.children) {
                    element.call(drawChildrens, d.children);
                }
            });
        })
}