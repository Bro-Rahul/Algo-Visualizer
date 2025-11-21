import React from 'react'
import PsudoCodeViewer from './PsudoCodeViewer'
import SelectSortingAlgo from './SelectSortingAlgo'
import useArraysProvider from '@/hooks/useArraysProvider'
import { Button } from '../ui/button'

const SortingController: React.FC<{
    highlightCurrentLine: (lineNumber: number) => void
    currentLine: number,
}> = ({ highlightCurrentLine, currentLine }) => {
    const { sortingStrategy, elements } = useArraysProvider();
    const handleSort = async () => {
        await sortingStrategy.performSorting(elements, highlightCurrentLine);
    }
    return (
        <div className='h-screen w-fit absolute top-0 right-0 flex flex-col justify-between py-5 items-end px-3'>
            <SelectSortingAlgo isSorting={currentLine !== -1}>
                <Button disabled={currentLine !== -1} onClick={handleSort} className="px-5 py-2 cursor-pointer bg-white text-black rounded-xl ">Sort</Button>
            </SelectSortingAlgo>
            <PsudoCodeViewer psudoCode={sortingStrategy.sorter.psudoCode} algoName={sortingStrategy.algoName} highlightLine={currentLine} isAlgoRunning={currentLine !== -1} />
        </div>
    )
}

export default SortingController