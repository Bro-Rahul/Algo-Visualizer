import { ArraysAlgorithmsPsudoCodes, ArraysElementsDimentions, } from "@/constants/data";
import { SequenceTupleType, SortingAlgo } from "@/types/arrays";
import { parseTransformAttribute, drawUpwardArrow, drawDownWardArrow } from ".";
import { BaseSorter } from "./animations";
import * as d3 from "d3";


const { width, height, gap } = ArraysElementsDimentions;


export class SelectionSort extends BaseSorter {
    pointerI: d3.BaseType | undefined;
    pointerJ: d3.BaseType | undefined;


    constructor() {
        super(0, 0, ArraysAlgorithmsPsudoCodes.SelectionSort);
        this.pointerI = undefined;
        this.pointerJ = undefined;
    }

    initializeBaseCoordinates(node: d3.BaseType) {
        const translateValues = d3.select(node)
            .attr("transform")
            .match(parseTransformAttribute)!;
        this.baseX = +translateValues[1];
        this.baseY = +translateValues[2];

        this.pointerI = drawUpwardArrow("i")?.node();
        this.pointerJ = drawDownWardArrow("j")?.node();
    }

    sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[] {
        this.initializeBaseCoordinates(nodes[0])

        const sortingSequence: SequenceTupleType[] = []
        let n = elements.length;
        for (let i = 0; i < n - 1; i++) {
            sortingSequence.push({
                args: [0, i, 0],
                command: "MOVEPOINTER"
            })

            let min_idx = i;

            for (let j = i + 1; j < n; j++) {
                sortingSequence.push({
                    args: [1, j, 2],
                    command: "MOVEPOINTER"
                })
                if (elements[j] < elements[min_idx]) {
                    sortingSequence.push({
                        args: [3],
                        command: "HIGHLIGHT"
                    })
                    sortingSequence.push({
                        args: [4],
                        command: "HIGHLIGHT"
                    })
                    min_idx = j;
                }
            }
            sortingSequence.push({
                args: [i, min_idx, 5],
                command: "SWAP"
            })
            let temp = elements[i];
            elements[i] = elements[min_idx];
            elements[min_idx] = temp;
        }
        return sortingSequence;
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
        }
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


export class InsertionSort extends BaseSorter {
    initializeBaseCoordinates(node: d3.BaseType) {
        const translateValues = d3.select(node)
            .attr("transform")
            .match(parseTransformAttribute)!;
        this.baseX = +translateValues[1];
        this.baseY = +translateValues[2];
    }

    constructor() {
        super(0, 0, ArraysAlgorithmsPsudoCodes.InsertionSort);
    }

    sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[] {
        this.initializeBaseCoordinates(nodes[0]);
        const sequenceTuple: SequenceTupleType[] = [];
        for (let i = 1; i < elements.length; i++) {
            sequenceTuple.push({
                command: "MOVEPOINTER",
                args: [0, i, 0]
            })
            let key = elements[i];
            let j = i - 1;

            while (j >= 0 && elements[j] > key) {
                sequenceTuple.push({
                    command: "HIGHLIGHT",
                    args: [3]
                })
                sequenceTuple.push({
                    command: "SWAP",
                    args: [j, j + 1, 4]
                })
                sequenceTuple.push({
                    command: "HIGHLIGHT",
                    args: [5]
                })
                elements[j + 1] = elements[j];
                j = j - 1;
            }
            sequenceTuple.push({
                command: "HIGHLIGHT",
                args: [6]
            })
            elements[j + 1] = key;
        }
        return sequenceTuple;
    }
    destroyPointer(): void {

    }

}


export class BubbleSort extends BaseSorter {

    constructor() {
        super(0, 0, ArraysAlgorithmsPsudoCodes.BubbleSort);
    }

    initializeBaseCoordinates(node: d3.BaseType) {
        const translateValues = d3.select(node)
            .attr("transform")
            .match(parseTransformAttribute)!;
        this.baseX = +translateValues[1];
        this.baseY = +translateValues[2];
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
    destroyPointer(): void {

    }

}

export class QuickSort extends BaseSorter {


    constructor() {
        super(0, 0, ArraysAlgorithmsPsudoCodes.BubbleSort);
    }


    sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[] {
        return []
    }
    destroyPointer(): void {

    }

    initializeBaseCoordinates(node: d3.BaseType): void {

    }

}

const functionMapper = {
    BubbleSort,
    InsertionSort,
    QuickSort,
    SelectionSort
};

function getSorter(algo: SortingAlgo): BaseSorter {
    return new functionMapper[algo]();
}


export class SorterStrategy {
    sorter: BaseSorter;
    algoName: string;


    constructor() {
        this.sorter = new SelectionSort();
        this.algoName = "Selection Sort"
    }

    public setSorter(algo: SortingAlgo) {
        this.sorter = getSorter(algo);
        this.algoName = algo;
    }

    public performSorting(elements: number[], onComplete?: () => void, onUpdate?: (progress: number) => void) {
        const nodes = d3.select("svg").selectAll("g").nodes();
        const sortingSequence = this.sorter.sort(elements, nodes);
        sortingSequence.map(item => {
            switch (item.command) {
                case "SWAP":
                    this.sorter.swap(item, nodes);
                    break;
                case "HIGHLIGHT":
                    this.sorter.highLigth(item, nodes);
                    break;
                case "MOVEPOINTER":
                    this.sorter.movePointer(item, nodes);
                    break;
            }
        })

        if (onUpdate) {
            this.sorter.tl.eventCallback("onUpdate", () => onUpdate(this.sorter.tl.progress() * 100))

        }
        this.sorter.tl.eventCallback("onComplete", () => {
            this.sorter.destroyPointer()
            if (onComplete) {
                onComplete();
            }
        })
    }
}