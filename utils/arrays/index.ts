import * as d3 from "d3"

export const generateRandomNumbers = (total: number = 5) => {
    return Array.from({ length: total }, () => Math.round(Math.random() * 100));
}
export const generateArrays = (elements: number[]) => {
    const svg = d3.select("svg");

    const grps = svg.selectAll("g")
        .data(elements)
        .join(
            enter => enter
                .append("g")
                .attr("transform", () => `translate(0,150)`)
                .call(sel =>
                    sel.transition()
                        .duration(100)
                        .attr("transform", (d, i) => `translate(${(i + 1) * 55},150)`)
                ),

            update => update
                .transition()
                .duration(100)
                .attr("transform", (d, i) => `translate(${(i + 1) * 55},150)`),

            exit => exit.remove()
        );

    grps.selectAll("rect")
        .data(d => [d])
        .join("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("rx", 8)
        .attr("ry", 8)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("fill", "transparent");

    // LABELS
    grps.selectAll("text")
        .data(d => [d])
        .join("text")
        .attr("x", 25)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "18px")
        .text(d => d);
};



export const swap = async <T extends d3.BaseType>(nodes: T[], i: number, j: number) => {
    const srcNodeGrp = d3.select(nodes[i]);
    const targetNodeGrp = d3.select(nodes[j]);

    const srcCoordinate = srcNodeGrp.attr("transform").match(/translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/)!;
    const targetCoordinates = targetNodeGrp.attr("transform").match(/translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/)!;
    const srcX = +srcCoordinate[1];
    const targetX = +targetCoordinates[1];
    const y = +targetCoordinates[2];

    srcNodeGrp.select("rect").attr("fill", "orange");
    targetNodeGrp.select("rect").attr("fill", "red");
    console.log("indside this swap function")


    await Promise.all([
        srcNodeGrp.transition().duration(300).attr("transform", `translate(${+srcX},${y + 100})`).end(),
        targetNodeGrp.transition().duration(300).attr("transform", `translate(${+targetX},${y - 100})`).end(),
    ]);

    await Promise.all([
        srcNodeGrp.transition().duration(300).attr("transform", `translate(${targetX},${y + 100})`).end(),
        targetNodeGrp.transition().duration(300).attr("transform", `translate(${+srcX},${y - 100})`).end(),
    ]);

    await Promise.all([
        srcNodeGrp.transition().duration(300).attr("transform", `translate(${targetX},${y})`).end(),
        targetNodeGrp.transition().duration(300).attr("transform", `translate(${srcX},${y})`).end(),
    ]);

    srcNodeGrp.select("rect").attr("fill", "transparent");
    targetNodeGrp.select("rect").attr("fill", "transparent");

    const temp = nodes[i];
    nodes[i] = nodes[j];
    nodes[j] = temp;
}