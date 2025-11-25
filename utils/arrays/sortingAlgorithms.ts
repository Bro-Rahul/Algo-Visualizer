import { SortingAlgo } from "@/types/arrays";
import * as d3 from "d3"
import { drawDownWardArrow, drawUpwardPointer, swap } from ".";
import { ArraysPsudoCodes } from "@/constants/data";


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
        this.psudoCode = ArraysPsudoCodes.BubbleSort;
    }

    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {
        let swapped = false;
        const node = d3.select(nodes[0]);
        const positions = node.attr("transform").match(/translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/)!;
        const width = +node.select("rect").attr("width") + 5;
        const height = +node.select("rect").attr("height");
        const xCoordinate = +positions[1] + width / 2;

        const pointerI = drawUpwardPointer("i");
        const pointerJ = drawDownWardArrow("j");
        const pointerk = drawDownWardArrow("k");

        pointerI?.attr("transform", `translate(${xCoordinate}, ${20})`);
        pointerJ?.attr("transform", `translate(${xCoordinate},${+positions[2]})`)
        pointerk?.attr("transform", `translate(${xCoordinate},${+positions[2]})`)


        for (let i = 0; i < elements.length; i++) {
            callback(0);
            pointerI?.attr("transform", `translate(${xCoordinate + i * width},${height * 2})`)
            await wait(100);
            swapped = false;
            for (let j = 0; j < elements.length - 1 - i; j++) {
                pointerJ?.attr("transform", `translate(${xCoordinate + j * width},${+positions[2] + height + 10})`)
                pointerk?.attr("transform", `translate(${xCoordinate + (j + 1) * width},${+positions[2] + height + 10})`)
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
        pointerI?.remove();
        pointerJ?.remove();
        pointerk?.remove();
        callback(-1);
    }
}

class InsertionSortAlgo implements BaseSorter {
    psudoCode: string;
    constructor() {
        this.psudoCode = ArraysPsudoCodes.InsertionSort;
    }
    async sort<T extends d3.BaseType>(nodes: T[], elements: number[], callback: (lineNumber: number) => void): Promise<void> {
        for (let i = 1; i < elements.length; i++) {
            callback(0);
            await wait(100);
            let key = elements[i];
            let j = i - 1;
            while (j >= 0 && elements[j] > key) {
                callback(3);
                await wait(100);
                await swap(nodes, j + 1, j);
                callback(4);
                await wait(100);
                elements[j + 1] = elements[j];
                j = j - 1;
            }
            elements[j + 1] = key;
        }
        callback(-1);
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
        let n = elements.length;
        for (let i = 0; i < n - 1; i++) {

            let min_idx = i;

            for (let j = i + 1; j < n; j++) {
                if (elements[j] < elements[min_idx]) {
                    min_idx = j;
                }
            }

            let temp = elements[i];
            elements[i] = elements[min_idx];
            elements[min_idx] = temp;
        }
    }
}

export class SorterStrategy {
    public sorter: BaseSorter;
    public algoName: string;
    constructor() {
        this.sorter = new BubbleSortAlgo();
        this.algoName = "Bubble Sort"
    }

    setSorter(algo: SortingAlgo) {
        switch (algo) {
            case "BubbleSort":
                this.sorter = new BubbleSortAlgo();
                this.algoName = "Bubble Sort";
                break;
            case "InsertionSort":
                this.sorter = new InsertionSortAlgo();
                this.algoName = "Insertion Sort";
                break;
            case "SelectionSort":
                this.sorter = new SelectionSortAlgo();
                this.algoName = "Selection Sort"
                break;
            case "QuickSort":
                this.sorter = new QuickSortAlgo();
                this.algoName = "Quick Sort"
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

export function selectionSort(arr: number[]): number[][] {
    const sortingSequence: number[][] = [];
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {

        // Assume the current position holds
        // the minimum element
        let min_idx = i;

        // Iterate through the unsorted portion
        // to find the actual minimum
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                // Update min_idx if a smaller element is found
                min_idx = j;
            }
        }

        // Move minimum element to its
        // correct position
        sortingSequence.push([i, min_idx]);
        let temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
    }
    return sortingSequence;
}