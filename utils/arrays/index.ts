import * as d3 from "d3"
import gsap from "gsap";

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
export const drawUpwardPointer = (
    label: string,
) => {
    const svg = d3.select("svg");
    const selection = svg.select("g");

    const transform = selection.attr("transform");
    if (!transform) return;

    const match = transform.match(/translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
    if (!match) return;

    const x = +match[1];
    const y = +match[2];

    const arrowY = y - 60;   // move arrow *above* the element

    const grp = svg.append("g")
        .attr("transform", `translate(${x}, ${arrowY})`);

    // Upward arrow (tail down → pointing up)
    grp.append("path")
        .attr("d", `
            M0 40      
            L0 0
            M-10 12
            L0 0
            L10 12
        `)
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .attr("fill", "none");

    grp.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .style("font-size", "14px")
        .text(label);

    return grp;
};


export const drawDownWardArrow = (
    lable: string,
) => {
    const svg = d3.select("svg");
    const selection = svg.select("g")
    const transform = selection.attr("transform");
    if (!transform) return;

    const match = transform.match(/translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
    if (!match) return;

    const x = +match[1];
    const y = +match[2];

    const arrowY = y + 60;

    const grp = svg.append("g")
        .attr("transform", `translate(${x}, ${arrowY})`);

    // Tail length increased from 20 → 40
    grp.append("path")
        .attr("d", `
                M0 0 
                L0 40        
                M-10 28 
                L0 40 
                L10 28
            `)
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .attr("fill", "none");

    grp.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .style("font-size", "14px")
        .text(lable)

    return grp;
};

export const parseTransformAttribute = /translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/;


export const swap = async <T extends d3.BaseType>(nodes: T[], i: number, j: number) => {
    const srcNodeGrp = d3.select(nodes[i]);
    const targetNodeGrp = d3.select(nodes[j]);

    const srcMatch = srcNodeGrp.attr("transform")!.match(parseTransformAttribute)!;
    const tgtMatch = targetNodeGrp.attr("transform")!.match(parseTransformAttribute)!;

    const srcX = +srcMatch[1];
    const srcY = +srcMatch[2];
    const targetX = +tgtMatch[1];
    const targetY = +tgtMatch[2];

    srcNodeGrp.select("rect").attr("fill", "orange");
    targetNodeGrp.select("rect").attr("fill", "red");

    const srcNode = srcNodeGrp.node()!;
    const targetNode = targetNodeGrp.node()!;

    // --- GSAP TIMELINE THAT PRESERVES TRANSLATE() ---
    const tl = gsap.timeline();

    // 1. Move vertically apart
    tl.to(srcNode, {
        duration: 0.3,
        attr: { transform: `translate(${srcX},${srcY + 100})` },
        ease: "power2.out"
    }, 0);

    tl.to(targetNode, {
        duration: 0.3,
        attr: { transform: `translate(${targetX},${targetY - 100})` },
        ease: "power2.out"
    }, 0);

    // 2. Swap horizontally
    tl.to(srcNode, {
        duration: 0.3,
        attr: { transform: `translate(${targetX},${srcY + 100})` },
        ease: "power2.out"
    });

    tl.to(targetNode, {
        duration: 0.3,
        attr: { transform: `translate(${srcX},${targetY - 100})` },
        ease: "power2.out"
    }, "<");

    // 3. Move back vertically
    tl.to(srcNode, {
        duration: 0.3,
        attr: { transform: `translate(${targetX},${targetY})` },
        ease: "power2.out"
    });

    tl.to(targetNode, {
        duration: 0.3,
        attr: { transform: `translate(${srcX},${srcY})` },
        ease: "power2.out"
    }, "<");

    await tl.then();

    srcNodeGrp.select("rect").attr("fill", "transparent");
    targetNodeGrp.select("rect").attr("fill", "transparent");

    // Swap array positions
    const temp = nodes[i];
    nodes[i] = nodes[j];
    nodes[j] = temp;
};
