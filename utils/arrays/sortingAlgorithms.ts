import { SortingAlgo } from "@/types/arrays";
import * as d3 from "d3"
import { swap } from ".";


interface BaseSorter {
    psudoCode: string,
    sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void>
}


function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class BubbleSortAlgo implements BaseSorter {
    psudoCode: string;

    constructor() {
        this.psudoCode = `for i from 0 to Array.length - 1
    set swapped to false
    for j from 0 to Array.length - i - 1
      if Array[j] > Array[j + 1]
        swap Array[j] and Array[j + 1]
        set swapped to true
    if not swapped
        break // Array is sorted`;
    }

    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {
        let swapped = false;
        for (let i = 0; i < elements.length; i++) {
            callback(0);
            await wait(100);
            swapped = false;
            for (let j = 0; j < elements.length - 1 - i; j++) {
                callback(2);
                await wait(100);
                callback(3)
                await wait(100)
                if (elements[j] > elements[j + 1]) {
                    callback(4);
                    await wait(100);
                    await swap(nodes, j, j + 1);
                    swapped = true;
                    [elements[j + 1], elements[j]] = [elements[j], elements[j + 1]];
                }
            }
            if (!swapped) {
                callback(6);
                await wait(100);
                break;
            }
        }

        callback(-1);
    }
}

class InsertionSortAlgo implements BaseSorter {
    psudoCode: string;
    constructor() {
        this.psudoCode = "";
    }
    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {
        console.log("inside the Insertion Sort algo");
    }
}

class SelectionSortAlgo implements BaseSorter {
    psudoCode: string;
    constructor() {
        this.psudoCode = "";
    }
    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {
        console.log("inside the Selection Sort algo")
    }
}

class QuickSortAlgo implements BaseSorter {
    psudoCode: string;
    constructor() {
        this.psudoCode = "";
    }
    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {
        console.log("Inside the quickSort Algo");
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
            case "QuickSort":
                this.sorter = new QuickSortAlgo();
                break;
            default:
                break;
        }
    }

    async performSorting(elements: number[], callback: (lineNumber: number) => void) {
        const nodes = d3.select("svg").selectAll("g").nodes();
        this.sorter.sort(nodes, elements, callback);
    }
}