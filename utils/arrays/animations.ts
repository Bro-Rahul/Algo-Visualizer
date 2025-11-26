import gsap from "gsap/all";
import * as d3 from "d3"
import { drawDownWardArrow, drawUpwardArrow, parseTransformAttribute } from ".";
import { ArraysPsudoCodes } from "@/constants/data";
import { SortingAlgo } from "@/types/arrays";
import { ArraysElementsDimentions } from "@/constants/data";


type OperationsType = "SWAP" | "HIGHLIGHT" | "MOVEPOINTER"


type SequenceTupleType = {
    command: OperationsType,
    args: number[]
}
const { width, height, gap } = ArraysElementsDimentions;

abstract class BaseSorter {
    tl = gsap.timeline();
    baseX: number
    baseY: number;

    constructor(x: number, y: number) {
        this.baseX = x;
        this.baseY = y;
    }

    abstract sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[]

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


    highLigth(sequenceTuple: SequenceTupleType, nodes: d3.BaseType[]) {
        this.tl.to(`#code-${sequenceTuple.args[1]}`, {
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

    abstract destroyPointer(): void
}


export class SelectionSort extends BaseSorter {

    psudoCode: string;
    pointerI: d3.BaseType | undefined;
    pointerJ: d3.BaseType | undefined;


    constructor() {
        super(0, 0);
        this.psudoCode = ArraysPsudoCodes.SelectionSort;
        this.pointerI = undefined;
        this.pointerJ = undefined;
    }

    sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[] {
        const translateValues = d3.select(nodes[0])
            .attr("transform")
            .match(parseTransformAttribute)!;
        this.baseX = +translateValues[1];
        this.baseY = +translateValues[2];

        this.pointerI = drawUpwardArrow("i")?.node();
        this.pointerJ = drawDownWardArrow("j")?.node();


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
                        args: [6, 3],
                        command: "HIGHLIGHT"
                    })
                    sortingSequence.push({
                        args: [6, 4],
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
            // here 0 stands for the I pointer in this algo
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
        d3.selectAll(".pointer").remove()
    }

}


export class InsertionSort extends BaseSorter {
    psudoCode: string;

    constructor() {
        super(0, 0);
        this.psudoCode = ArraysPsudoCodes.SelectionSort;
    }

    sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[] {
        return []
    }
    destroyPointer(): void {

    }

}


export class BubbleSort extends BaseSorter {
    psudoCode: string;

    constructor() {
        super(0, 0);
        this.psudoCode = ArraysPsudoCodes.SelectionSort;
    }

    sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[] {
        return []
    }
    destroyPointer(): void {

    }

}

export class QuickSort extends BaseSorter {
    psudoCode: string;

    constructor() {
        super(0, 0);
        this.psudoCode = ArraysPsudoCodes.SelectionSort;
    }


    sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[] {
        return []
    }
    destroyPointer(): void {

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

    public performSorting(elements: number[]) {
        const nodes = d3.select("svg").selectAll("g").nodes();
        const sortingSequence = this.sorter.sort(elements, nodes);
        sortingSequence.map(item => {
            if (item.command === "SWAP") {
                this.sorter.swap(item, nodes);
            } else if (item.command === "HIGHLIGHT") {
                this.sorter.highLigth(item, nodes);
            } else {
                this.sorter.movePointer(item, nodes);
            }
        })
        this.sorter.tl.eventCallback("onComplete", this.sorter.destroyPointer)
    }
}