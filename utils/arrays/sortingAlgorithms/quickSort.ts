import { ArraysAlgorithmsPsudoCodes, ArraysElementsDimentions } from "@/constants/data";
import { SequenceTupleType } from "@/types/arrays";
import { drawDownWardArrow, drawUpwardArrow, parseTransformAttribute } from "..";
import BaseSorter from "../baseSorter";
import * as d3 from "d3";

const { width, height, gap } = ArraysElementsDimentions;


class QuickSort extends BaseSorter {
    pointerI: d3.BaseType | undefined;
    pointerJ: d3.BaseType | undefined;
    pivot: d3.BaseType | undefined;

    constructor() {
        super(0, 0, ArraysAlgorithmsPsudoCodes.QuickSort);
    }

    initializeBaseCoordinates(node: d3.BaseType): void {
        const translateValues = d3.select(node)
            .attr("transform")
            .match(parseTransformAttribute)!;
        this.baseX = +translateValues[1];
        this.baseY = +translateValues[2];
        this.pointerI = drawUpwardArrow("i")?.node();
        this.pointerJ = drawDownWardArrow("j")?.node();
        // this.pivot = drawDownWardArrow("p")?.node();
    }
    private partition(elements: number[], low: number, high: number, sequenceTuple: SequenceTupleType[]) {

        // choose the pivot
        sequenceTuple.push({
            command: "HIGHLIGHT",
            args: [9]
        })
        let pivot = elements[high];


        // index of smaller element and indicates
        // the right position of pivot found so far
        let i = low - 1;
        sequenceTuple.push({
            command: "HIGHLIGHT",
            args: [10]
        })

        // traverse elements[low..high] and move all smaller
        // elements to the left side. Elements from low to
        // i are smaller after every iteration

        for (let j = low; j <= high - 1; j++) {

            sequenceTuple.push({
                command: "MOVEPOINTER",
                args: [1, low, 11]
            });

            if (elements[j] < pivot) {
                sequenceTuple.push({
                    command: "HIGHLIGHT",
                    args: [12]
                })
                i++;
                // swap the elements
                sequenceTuple.push({
                    command: "MOVEPOINTER",
                    args: [0, i, 11]
                });

                [elements[i], elements[j]] = [elements[j], elements[i]];
                sequenceTuple.push({
                    command: "SWAP",
                    args: [i, j, 13]
                })
            }
        }

        // move pivot after smaller elements and
        // return its position
        // swap the i+1 and high
        [elements[i + 1], elements[high]] = [elements[high], elements[i + 1]];
        sequenceTuple.push({
            command: "SWAP",
            args: [i + 1, high, 16]
        })
        sequenceTuple.push({
            command: "HIGHLIGHT",
            args: [17]
        })
        return i + 1;
    }

    private quickSort(elements: number[], low: number, high: number, sequenceTuple: SequenceTupleType[]) {
        if (low < high) {
            sequenceTuple.push({
                command: "HIGHLIGHT",
                args: [1]
            })
            sequenceTuple.push({
                command: "PIVOT",
                args: [2]
            })
            sequenceTuple.push({
                command: "HIGHLIGHT",
                args: [3]
            })
            // pi is the partition return index of pivot
            sequenceTuple.push({
                command: "MOVEPOINTER",
                args: [0, low, 4]
            })
            let pi = this.partition(elements, low, high, sequenceTuple);

            sequenceTuple.push({
                command: "HIGHLIGHT",
                args: [4]
            })
            // recursion calls for smaller elements
            // and greater or equals elements
            this.quickSort(elements, low, pi - 1, sequenceTuple);
            sequenceTuple.push({
                command: "HIGHLIGHT",
                args: [5]
            })
            this.quickSort(elements, pi + 1, high, sequenceTuple);
        }
    }

    sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[] {
        this.initializeBaseCoordinates(nodes[0])
        const sequenceTuple: SequenceTupleType[] = [];
        this.quickSort(elements, 0, elements.length - 1, sequenceTuple);
        return sequenceTuple;
    }

    movePointer(sequenceTuple: SequenceTupleType, nodes: d3.BaseType[]): void {
        const { args, command } = sequenceTuple;
        if (command === "PIVOT") {

        } else {
            const [pointerName, newPosition, highLigthLine] = args;
            this.tl.to(`#code-${highLigthLine}`, {
                backgroundColor: "black",
                duration: 0.1,
                yoyo: true,
                repeat: 1
            })

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
            }
        }
    }
}

export default QuickSort;