"use client"
import Controller from '@/components/sorting/Controller'
import PerformanceMatrix from '@/components/sorting/PerformanceMatrix'
import PsudoCodeVisualizer from '@/components/sorting/PsudoCodeVisualizer'
import { useParams } from 'next/navigation'
import React from 'react'
import useSorter from '@/hooks/useSorter'
import VisualizerCanvas from '@/components/sorting/VisualizerCanvas'
import { SortingAlgo } from '@/types/arrays'

const mapper: Record<string, SortingAlgo> = {
    "bubble-sort": "BubbleSort",
    "quick-sort": "QuickSort",
    "insertion-sort": "InsertionSort",
    "selection-sort": "SelectionSort"
}

const page: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { svgRef, elements, isSorting, isArraySorted, progress, togglePlayAndPause, handleSorting, addRandomElements } = useSorter(mapper[slug]);
    return (
        <main className='flex flex-col w-full h-screen bg-primary/5'>
            <div className="w-full h-1/2">
                <VisualizerCanvas elements={elements} svgRef={svgRef} />
            </div>
            <div className='grid grid-cols-3 gap-5 bg-primary h-1/2 px-10 py-5 rounded-2xl border-t-2 border-t-zinc-700'>
                <PerformanceMatrix
                    algoName={mapper[slug]}
                    isArraySorted={isArraySorted.current}
                />
                <Controller
                    isPlayling={isSorting}
                    progress={progress}
                    togglePlayAndPause={togglePlayAndPause}
                    inserRandomElements={addRandomElements}
                    handleSorting={handleSorting}
                />
                <PsudoCodeVisualizer />
            </div>
        </main>
    )
}

export default page