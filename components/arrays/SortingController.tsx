import React, { useState } from 'react'
import PsudoCodeViewer from './PsudoCodeViewer'
import useArraysProvider from '@/hooks/useArraysProvider'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SortingAlgo } from "@/types/arrays"
import clsx from 'clsx'

const SortingController: React.FC<{
    isSorting: boolean,
    setIsSorting: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isSorting, setIsSorting }) => {
    const { sortingStrategy, elements } = useArraysProvider();
    const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgo>("SelectionSort");

    const handleSelect = (algo: string) => {
        sortingStrategy.setSorter(algo as SortingAlgo)
        setSelectedAlgo(algo as SortingAlgo);
    }

    const handleSortingClick = () => {
        setIsSorting(pre => !pre)
        sortingStrategy.performSorting(elements, () => setIsSorting(pre => !pre))
    }

    const handlePlayAndPause = () => {
        if (sortingStrategy.sorter.isPaused()) {
            sortingStrategy.sorter.play();
        } else {
            sortingStrategy.sorter.stop();
        }
    }

    return (
        <div className='h-screen w-fit absolute top-0 right-0 flex flex-col justify-between py-5 items-end px-3'>
            <section className="flex flex-row gap-2 items-center justify-center">
                <Button disabled={isSorting} onClick={handleSortingClick} className="px-5 py-2 cursor-pointer bg-white text-black rounded-xl ">Sort</Button>
                <Button onClick={handlePlayAndPause} className={clsx("px-5 py-2 cursor-pointer bg-white text-black rounded-xl", !isSorting && "hidden")}>STOP</Button>
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
            <PsudoCodeViewer isAlgoRunning={isSorting} psudoCode={sortingStrategy.sorter.psudoCode} algoName={sortingStrategy.algoName} />
        </div>
    )
}

export default SortingController
