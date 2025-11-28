import React, { useReducer, useState } from 'react'
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
import AnimationTracker from './AnimationTracker'


type AnimationState = {
    progress: number
    playBackSpeed: number
}

type Action =
    | { type: "moveForward" }
    | { type: "moveBackward" }
    | { type: "setProgress"; payload: number }
    | { type: "setPlayBackSpeed"; payload: number }



const initialAnimationState: AnimationState = {
    progress: 0,
    playBackSpeed: 1,
}

const SortingController: React.FC<{
    isSorting: boolean
    setIsSorting: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isSorting, setIsSorting }) => {
    const { sortingStrategy, elements } = useArraysProvider()
    const animationReducer: React.Reducer<AnimationState, Action> = (
        state,
        action
    ) => {
        switch (action.type) {

            case "moveForward":
                return { ...state, progress: state.progress + 0.5 }

            case "moveBackward":
                return { ...state, progress: state.progress - 0.5 }

            case 'setPlayBackSpeed':
                if (action.payload === -1) {
                    return {
                        ...state,
                        playBackSpeed: Math.max(1, state.playBackSpeed - 1)
                    }
                } else {
                    return {
                        ...state,
                        playBackSpeed: Math.min(3, state.playBackSpeed + 1)
                    }
                }

            case "setProgress":
                return {
                    ...state,
                    progress: action.payload
                }

            default:
                return state
        }
    }
    const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgo>("QuickSort")
    const [state, dispatch] = useReducer(animationReducer, initialAnimationState);




    const handleSelect = (algo: string) => {
        sortingStrategy.setSorter(algo as SortingAlgo)
        setSelectedAlgo(algo as SortingAlgo)
    }

    const handleSortingClick = () => {
        setIsSorting(true)

        sortingStrategy.performSorting(
            elements,
            () => setIsSorting(pre => false),
            (updatedProgress) => dispatch({ type: "setProgress", payload: updatedProgress })
        )
    }

    const handlePlayAndPause = () => {
        if (sortingStrategy.sorter.isPaused()) {
            sortingStrategy.sorter.play();
            setIsSorting(true);
        } else {
            sortingStrategy.sorter.stop();
            setIsSorting(false);
        }
    }


    const handleMoveForward = () => {
        sortingStrategy.sorter.tl.time(state.progress + 0.5)
        dispatch({ type: "moveForward" })
    }

    const handleMoveBackWard = () => {
        sortingStrategy.sorter.tl.time(state.progress - 0.5)
        dispatch({ type: "moveBackward" })
    }

    const handlePlayBackSpeed = (speed: number) => {
        sortingStrategy.sorter.tl.timeScale(2)
        dispatch({ payload: speed, type: "setPlayBackSpeed" })
    }

    return (
        <>
            <div className='h-screen w-fit absolute top-0 right-0 flex flex-col justify-between py-5 items-end px-3'>
                <section className="flex flex-row gap-2 items-center justify-center">
                    <Button
                        disabled={isSorting}
                        onClick={handleSortingClick}
                        className="px-5 py-2 cursor-pointer bg-white text-black rounded-xl"
                    >
                        Sort
                    </Button>

                    <Button
                        onClick={handlePlayAndPause}
                        className={clsx(
                            "px-5 py-2 cursor-pointer bg-white text-black rounded-xl",
                            !isSorting && "hidden"
                        )}
                    >
                        STOP
                    </Button>

                    <Select
                        disabled={isSorting}
                        defaultValue={selectedAlgo}
                        onValueChange={handleSelect}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Algo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BubbleSort">Bubble Sort</SelectItem>
                            <SelectItem value="InsertionSort">Insertion Sort</SelectItem>
                            <SelectItem value="SelectionSort">Selection Sort</SelectItem>
                            <SelectItem value="QuickSort">QuickSort</SelectItem>
                        </SelectContent>
                    </Select>
                </section>

                <PsudoCodeViewer
                    isAlgoRunning={state.progress > 0 && state.progress < 100}
                    psudoCode={sortingStrategy.sorter.psudoCode}
                    algoName={sortingStrategy.algoName}
                />
            </div>

            <AnimationTracker
                progress={state.progress}
                isPause={isSorting}
                playBackSpeed={state.playBackSpeed}
                handlePlayBackSpeed={handlePlayBackSpeed}
                handleMoveBackWard={handleMoveBackWard}
                handleMoveForward={handleMoveForward}
                handleTogglePlayAndPause={handlePlayAndPause}
            />
        </>
    )
}

export default SortingController
