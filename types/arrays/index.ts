/**
 * this type will store the all the keys algorithm that our project supports
 */
export type SortingAlgo = "BubbleSort" | "InsertionSort" | "SelectionSort" | "QuickSort"

export type OperationsType = "SWAP" | "HIGHLIGHT" | "MOVEPOINTER"


export type SequenceTupleType = {
    command: OperationsType,
    args: number[]
}