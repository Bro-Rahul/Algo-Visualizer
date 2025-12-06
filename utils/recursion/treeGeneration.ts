import { FunctionCallStackType } from "@/types/recursion";
import * as d3 from "d3";


export class DrawTree {
    rawTreeData: FunctionCallStackType<any, any>

    root: d3.HierarchyNode<FunctionCallStackType<any, any>>

    tree: d3.HierarchyPointNode<FunctionCallStackType<any, any>>;

    static linkGenerator: d3.Link<any, d3.HierarchyPointLink<FunctionCallStackType<any, any>>, d3.HierarchyPointNode<FunctionCallStackType<any, any>>>;

    constructor(rawTreeData: FunctionCallStackType<any, any>) {
        this.rawTreeData = rawTreeData;
        this.root = d3.hierarchy<FunctionCallStackType<any, any>>(rawTreeData);
        const treeLayout = d3
            .tree<FunctionCallStackType<any, any>>()
            .nodeSize([100, 150])
        this.tree = treeLayout(this.root);

        DrawTree.linkGenerator = d3.linkVertical<
            d3.HierarchyPointLink<FunctionCallStackType<any, any>>,
            d3.HierarchyPointNode<FunctionCallStackType<any, any>>
        >()
            .x(d => d.x)
            .y(d => d.y);
    }

    static onClickEvent(grp: d3.Selection<SVGGElement, unknown, HTMLElement, any>, d: d3.HierarchyPointNode<FunctionCallStackType<any, any>>) {
        if (!d.children) return;

        const parentIdx = d.data.id;
        const parentX = d.x;
        const parentY = d.y;

        const isCollapsed = grp.selectAll(`.node_${parentIdx}_childrens`).empty();

        if (!isCollapsed) {
            const allDescendants = d.descendants();

            allDescendants.forEach(child => {
                const cid = child.data.id;

                grp.selectAll(`.node_${cid}_childrens`)
                    .transition()
                    .duration(300)
                    .attr("r", 0)
                    .remove();

                grp.selectAll(`.text_${cid}_childrens`)
                    .transition()
                    .duration(300)
                    .style("opacity", 0)
                    .remove();

                grp.selectAll(`.link_${cid}_childrens`)
                    .transition()
                    .duration(300)
                    .attr("stroke-dasharray", "0 100")
                    .remove();
            });

            return;
        }

        const toRenderNodes = d.children;
        const toRenderLinks = d.links().filter(item => item.source.data.id === parentIdx);

        const nodes = grp.selectAll(`.node_${parentIdx}_childrens`)
            .data(toRenderNodes)
            .join(
                enter =>
                    enter
                        .append("circle")
                        .attr("cx", d => parentX)
                        .attr("cy", d => parentY)
                        .attr("class", d => `node_${parentIdx}_childrens`)
                        .attr("id", d => `node_${d.data.id}`)
                        .attr("r", 0)
                        .attr("stroke", "#ccc")
                        .attr("stroke-width", 3)
                        .attr("fill", d => d.height === 0 ? "green" : "orange")
                        .call(ele =>
                            ele.transition()
                                .duration(1000)
                                .ease(d3.easeBackOut)
                                .attr("cx", d => d.x)
                                .attr("cy", d => d.y)
                                .attr("r", 20)
                        ),
                update => update,
                exit => exit

            );

        // ---- TEXT ----
        grp.selectAll(`.text_${parentIdx}_childrens`)
            .data(toRenderNodes)
            .join(
                enter => enter
                    .append("text")
                    .attr("class", `text_${parentIdx}_childrens`)
                    .text(d => `ID ${d.data.id}`)
                    .attr("x", parentX)
                    .attr("y", parentY)
                    .attr("fill", "white")
                    .style("opacity", 0)
                    .call(ele =>
                        ele.transition()
                            .duration(300)
                            .style("opacity", 1)
                            .attr("x", d => d.x - 60)
                            .attr("y", d => d.y)
                    ),
                update => update,
                exit => exit

            );

        grp.selectAll(`.link_${parentIdx}_childrens`)
            .data(toRenderLinks)
            .join(
                enter =>
                    enter
                        .append("path")
                        .attr("class", `link_${parentIdx}_childrens`)
                        .attr("d", DrawTree.linkGenerator)
                        .attr("fill", "none")
                        .attr("stroke", "#ccc")
                        .attr("stroke-width", 2)
                        .attr("stroke-dasharray", "0 100")
                        .call(ele =>
                            ele.transition()
                                .duration(500)
                                .attr("stroke-dasharray", "100 0")
                        ),
                update => update,
                exit => exit
            );

        nodes.on("click", (e, d) => {
            grp.call(DrawTree.onClickEvent, d);
        });

    }

    drawTree() {
        const svg = d3.select("#recursion-canvas")
        svg.selectAll("g").remove();
        const grp = svg.append("g")
            .attr("transform", "translate(1000,100)")

        const root = this.tree.descendants()[0];
        const idx = root.data.id;

        const rootNode = grp.selectAll(`#node_${idx}`)
            .data([root])
            .join("circle")
            .attr("id", `#node_${idx}`)
            .attr("cx", (d, i) => d.x)
            .attr("cy", (d, i) => d.y)
            .attr("r", 20)
            .attr("stroke", "#ccc")
            .attr("stroke-width", 3)
            .attr("fill", "red")


        grp.selectAll(`#text_${idx}`)
            .data([root])
            .join("text")
            .attr("id", `#text_${idx}`)
            .text(d => `ID ${d.data.id}`)
            .attr("x", d => d.x - 3 * 20)
            .attr("y", d => d.y)
            .attr('fill', 'white')

        rootNode.on("click", (e: MouseEvent, d) => {
            grp.call(DrawTree.onClickEvent, d)
        });
    }
}