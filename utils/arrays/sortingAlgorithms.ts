import { SortingAlgo } from "@/types/arrays";
import * as d3 from "d3"
import { swap } from ".";


interface BaseSorter {
    sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void>
}

class BubbleSortAlgo implements BaseSorter {

    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {
        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < elements.length - 1; j++) {
                if (elements[j] > elements[j + 1]) {
                    await swap(nodes, j, j + 1);
                    [elements[j + 1], elements[j]] = [elements[j], elements[j + 1]];
                }
            }
        }
    }
}

class InsertionSortAlgo implements BaseSorter {
    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {

    }
}

class SelectionSortAlgo implements BaseSorter {
    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {

    }
}

class QuickSortAlgo implements BaseSorter {
    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {

    }
}

export class SorterStrategy {
    public sorter: BaseSorter;
    constructor() {
        this.sorter = new BubbleSortAlgo();
    }

    setSorter(algo: SortingAlgo) {
        switch (algo) {
            case "BubbleSort":
                this.sorter = new BubbleSortAlgo();
                break;
            case "InsertionSort":
                this.sorter = new InsertionSortAlgo();
                break;
            case "SelectionSort":
                this.sorter = new SelectionSortAlgo();
                break;
            default:
                break;
        }
    }

    async performSorting(elements: number[]) {
        const nodes = d3.select("svg").selectAll("g").nodes();
        console.log("perform sorting")
        console.log(elements)
        this.sorter.sort(nodes, elements, () => { });
        console.log("after perform sorting")
        console.log(elements)
    }
}