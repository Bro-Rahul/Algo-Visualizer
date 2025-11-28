import { ArraysAlgorithmsPsudoCodes, ArraysElementsDimentions } from "@/constants/data";
import { SequenceTupleType } from "@/types/arrays";
import { parseTransformAttribute, drawUpwardArrow, drawDownWardArrow } from "..";
import BaseSorter from "../baseSorter";
import * as d3 from "d3";

const { width, height, gap } = ArraysElementsDimentions;


class BubbleSort extends BaseSorter {
    pointerI: d3.BaseType | undefined;
    pointerJ: d3.BaseType | undefined;
    pointerK: d3.BaseType | undefined;

    constructor() {
        super(0, 0, ArraysAlgorithmsPsudoCodes.BubbleSort);
    }

    initializeBaseCoordinates(node: d3.BaseType) {
        const translateValues = d3.select(node)
            .attr("transform")
            .match(parseTransformAttribute)!;
        this.baseX = +translateValues[1];
        this.baseY = +translateValues[2];

        this.pointerI = drawUpwardArrow("i")?.node();
        this.pointerJ = drawDownWardArrow("j")?.node();
        this.pointerK = drawDownWardArrow("k")?.node();
    }

    sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[] {
        this.initializeBaseCoordinates(nodes[0])

        const sequenceTuple: SequenceTupleType[] = [];
        let i, j, temp, n = elements.length;
        let swapped;
        for (i = 0; i < n - 1; i++) {
            sequenceTuple.push({
                command: "MOVEPOINTER",
                args: [0, i, 0]
            })
            swapped = false;
            for (j = 0; j < n - i - 1; j++) {
                sequenceTuple.push({
                    command: "MOVEPOINTER",
                    args: [1, j, 2]
                })
                if (elements[j] > elements[j + 1]) {
                    sequenceTuple.push({
                        command: "HIGHLIGHT",
                        args: [3]
                    })
                    sequenceTuple.push({
                        command: "SWAP",
                        args: [j, j + 1, 4]
                    })
                    temp = elements[j];
                    elements[j] = elements[j + 1];
                    elements[j + 1] = temp;
                    swapped = true;
                }
            }

            if (swapped == false) {
                sequenceTuple.push({
                    command: "HIGHLIGHT",
                    args: [6]
                })
                break;
            }
        }
        return sequenceTuple;
    }
    movePointer(sequenceTuple: SequenceTupleType, nodes: d3.BaseType[]): void {
        this.tl.to(`#code-${sequenceTuple.args[2]}`, {
            backgroundColor: "black",
            duration: 0.1,
            yoyo: true,
            repeat: 1
        })

        const [pointerName, newPosition] = sequenceTuple.args;
        const fullWidth = width + gap;
        const offSetWidth = newPosition * fullWidth + fullWidth / 2;
        if (pointerName === 0) {
            this.tl.to(this.pointerI!, {
                duration: .2,
                attr: {
                    transform: `translate(${this.baseX + offSetWidth},${this.baseY - height})`
                }
            }, "<")
        } else {
            this.tl.to(this.pointerJ!, {
                duration: .2,
                attr: {
                    transform: `translate(${this.baseX + offSetWidth},${this.baseY + height})`
                }
            }, "<")

            this.tl.to(this.pointerK!, {
                duration: .2,
                attr: {
                    transform: `translate(${this.baseX + offSetWidth + fullWidth},${this.baseY + height})`
                }
            }, "<")
        }
    }
}

export default BubbleSort;