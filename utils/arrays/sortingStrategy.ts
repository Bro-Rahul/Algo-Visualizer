import { SortingAlgo } from "@/types/arrays";
import * as d3 from "d3";
import BaseSorter from "./baseSorter";
import SelectionSort from "./sortingAlgorithms/selectionSort";
import BubbleSort from "./sortingAlgorithms/bubbleSort";
import InsertionSort from "./sortingAlgorithms/insertionSort";
import QuickSort from "./sortingAlgorithms/quickSort";

const functionMapper = {
    BubbleSort,
    InsertionSort,
    QuickSort,
    SelectionSort
};

function getSorter(algo: SortingAlgo): BaseSorter {
    return new functionMapper[algo]();
}


class SorterStrategy {
    sorter: BaseSorter;
    algoName: string;


    constructor() {
        this.sorter = new QuickSort();
        this.algoName = "Quick Sort"
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
                default:
                    // will call for both movePointer and Pivot type commands the deriving sorting algo will implement their logic for movePointer and Pivot if they have it. like for quicksort algo there is both command so it handle it by it own and other will just bypass the pivot
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

export default SorterStrategy;