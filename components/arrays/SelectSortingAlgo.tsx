import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SortingAlgo } from "@/types/arrays"
import React, { useState } from "react"
import useArraysProvider from "@/hooks/useArraysProvider"

const SelectSortingAlgo: React.FC<{
    children?: React.ReactNode,
    isSorting: boolean
}> = ({ children, isSorting }) => {
    const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgo>("BubbleSort");
    const { sortingStrategy } = useArraysProvider();
    const handleSelect = (algo: string) => {
        sortingStrategy.setSorter(algo as SortingAlgo)
        setSelectedAlgo(algo as SortingAlgo);
    }
    return (
        <section className="flex flex-row gap-2 items-center justify-center">
            {children}
            <Select disabled={isSorting} defaultValue={selectedAlgo} onValueChange={handleSelect}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Algo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="BubbleSort">Bubble Sort</SelectItem>
                    <SelectItem value="InsertionSort">Insertion Sort</SelectItem>
                    <SelectItem value="SelectionSort">Selection Sort</SelectItem>
                    <SelectItem value="QuickSort">QuickSort Sort</SelectItem>
                </SelectContent>
            </Select>
        </section>
    )
}

export default SelectSortingAlgo