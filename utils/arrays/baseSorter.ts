import gsap from "gsap/all";
import * as d3 from "d3"
import { SequenceTupleType } from "@/types/arrays";

abstract class BaseSorter {
    tl = gsap.timeline();
    psudoCode: string;
    baseX: number
    baseY: number;

    constructor(x: number, y: number, code: string) {
        this.baseX = x;
        this.baseY = y;
        this.psudoCode = code;
    }

    abstract sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[]
    abstract initializeBaseCoordinates(node: d3.BaseType): void;
    /**
     * Performs a swap operation between two nodes based on the values provided
     * in the sequence tuple.  
     *
     * The `args` array inside the `sequenceTuple` contains three values:
     *
     * 1. **pointer** (`0` or `1`):  
     *    - `0` → refers to the **i-pointer**  
     *    - `1` → refers to the **j-pointer**
     *
     * 2. **pointerVal** (number):  
     *    The value associated with the selected pointer (i or j).  
     *    This is used to determine which node should be moved/swapped.
     *
     * 3. **highlightLine** (number):  
     *    The line number in the pseudocode that should be highlighted during
     *    visualization to reflect the current algorithm step.
     *
     * @param {SequenceTupleType} sequenceTuple  
     *        The sequence tuple describing the `SWAP` command and its arguments.
     *        - `command`: `"SWAP"`  
     *        - `args`: `[pointer, pointerVal, highlightLine]`
     *
     * @param {d3.BaseType[]} nodes  
     *        The list of D3 nodes participating in the swap animation.
     *
     * @returns {void}  
     *          This function does not return anything.
     */

    swap(sequenceTuple: SequenceTupleType, nodes: d3.BaseType[]) {
        const LIFT_Y = 100;
        const [srcIdx, targetIdx, highLigthLine] = sequenceTuple.args;

        if (srcIdx !== targetIdx) {
            const srcGrp = d3.select(nodes[srcIdx]);
            const targetGrp = d3.select(nodes[targetIdx]);

            this.tl.to(`#code-${highLigthLine}`, {
                backgroundColor: "black",
                duration: 0.2
            });

            this.tl.to(srcGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * srcIdx},${LIFT_Y})` },
                onStart: () => { srcGrp.select("rect").attr("fill", "red") }
            }, "<");

            this.tl.to(targetGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * targetIdx},${LIFT_Y})` },
                onStart: () => { targetGrp.select("rect").attr("fill", "orange") }
            }, "<");

            this.tl.to(srcGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * targetIdx},${LIFT_Y})` },
            });

            this.tl.to(targetGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * srcIdx},${LIFT_Y})` }
            }, "<");

            this.tl.to(srcGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * targetIdx},${this.baseY})` },
                onComplete: () => { srcGrp.select("rect").attr("fill", "transparent") }
            });

            this.tl.to(targetGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * srcIdx},${this.baseY})` },
                onComplete: () => {
                    targetGrp.select("rect").attr("fill", "transparent");
                    d3.select(`#code-${highLigthLine}`).style("background-color", "transparent");
                }
            }, "<");

            const temp = nodes[srcIdx];
            nodes[srcIdx] = nodes[targetIdx];
            nodes[targetIdx] = temp;
        }
    }

    /**
     * Highlights a specific pseudocode line based on the value provided
     * in the sequence tuple.
     *
     * This function is used when the `HIGHLIGHT` command is issued.
     *
     * The `args` array for this command will always contain **exactly one** item:
     *
     * 1. **lineNumber** (number):  
     *    The index used to select the DOM element `#code-{lineNumber}`.
     *    That element will be highlighted to visually indicate the
     *    current algorithm step.
     *
     * @param {SequenceTupleType} sequenceTuple  
     *        The tuple describing the `"HIGHLIGHT"` command.
     *        - `command`: `"HIGHLIGHT"`  
     *        - `args`: `[lineNumber]` (only one element)
     *
     * @param {d3.BaseType[]} nodes  
     *        The D3 nodes used in the visualization.  
     *        (Included for consistency but not used in this function.)
     *
     * @returns {void}
     *          This function performs animation only and returns nothing.
     */
    highLigth(sequenceTuple: SequenceTupleType, nodes: d3.BaseType[]) {
        this.tl.to(`#code-${sequenceTuple.args[0]}`, {
            backgroundColor: "black",
            duration: 0.1,
            yoyo: true,
            repeat: 1
        }, ">")
    }

    movePointer(sequenceTuple: SequenceTupleType, nodes: d3.BaseType[]) {
        this.highLigth(sequenceTuple, nodes)
    }

    stop() {
        this.tl.pause();
    }

    play() {
        this.tl.play();
    }

    isPaused() {
        return this.tl.paused();
    }

    destroyPointer(): void {
        d3.selectAll(".pointer")
            .transition()
            .duration(300)
            .style("filter", "blur(6px)")
            .style("opacity", 0)
            .remove();
    }
}

export default BaseSorter;