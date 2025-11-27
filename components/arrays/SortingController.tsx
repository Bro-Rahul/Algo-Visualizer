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

/* ------------------------------
   TYPES
--------------------------------*/
type AnimationState = {
    progress: number
    isPlaying: boolean
    playBackSpeed: number
}

type Action =
    | { type: "playAnimation" }
    | { type: "pauseAnimation" }
    | { type: "togglePlayAndPause" }
    | { type: "moveForward" }
    | { type: "moveBackward" }
    | { type: "speedUpAnimation" }
    | { type: "slowDownAnimation" }
    | { type: "setProgress"; payload: number }   // ✅ PAYLOAD ACTION

/* ------------------------------
   REDUCER
--------------------------------*/
const animationReducer: React.Reducer<AnimationState, Action> = (
    state,
    action
) => {
    switch (action.type) {
        case "togglePlayAndPause":
            return { ...state, isPlaying: !state.isPlaying }

        case "moveForward":
            return { ...state, progress: state.progress + 0.5 }

        case "moveBackward":
            return { ...state, progress: state.progress - 0.5 }

        case "speedUpAnimation":
            return { ...state, playBackSpeed: state.playBackSpeed + 1 }

        case "slowDownAnimation":
            return {
                ...state,
                playBackSpeed: Math.max(1, state.playBackSpeed - 1),
            }

        case "playAnimation":
            return { ...state, isPlaying: true }

        case "pauseAnimation":
            return { ...state, isPlaying: false }

        case "setProgress":   // ✅ NEW PAYLOAD HANDLER
            return {
                ...state,
                progress: action.payload
            }

        default:
            return state
    }
}

/* ------------------------------
   INITIAL STATE
--------------------------------*/
const initialAnimationState: AnimationState = {
    isPlaying: false,
    progress: 0,
    playBackSpeed: 1,
}

/* ------------------------------
   COMPONENT
--------------------------------*/
const SortingController: React.FC<{
    isSorting: boolean
    setIsSorting: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isSorting, setIsSorting }) => {
    const { sortingStrategy, elements } = useArraysProvider()
    const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgo>("SelectionSort")

    const [state, dispatch] = useReducer(animationReducer, initialAnimationState)

    /* ------------------------------
       HANDLERS
    --------------------------------*/

    const handleSelect = (algo: string) => {
        sortingStrategy.setSorter(algo as SortingAlgo)
        setSelectedAlgo(algo as SortingAlgo)
    }

    const handleSortingClick = () => {
        setIsSorting(prev => !prev)

        sortingStrategy.performSorting(
            elements,
            () => dispatch({ type: "pauseAnimation" }),  // stop animation on finish
            (temp: number) => dispatch({                 // temp = progress from callback
                type: "setProgress",
                payload: temp
            })
        )
    }

    const handlePlayAndPause = () => {
        dispatch({ type: "togglePlayAndPause" })

        if (state.isPlaying) sortingStrategy.sorter.stop()
        else sortingStrategy.sorter.play()
    }

    const handleMoveForward = () => {
        dispatch({ type: "moveForward" })
        sortingStrategy.sorter.tl.time(state.progress + 0.5)
    }

    const handleMoveBackWard = () => {
        dispatch({ type: "moveBackward" })
        sortingStrategy.sorter.tl.time(state.progress - 0.5)
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
                    isAlgoRunning={isSorting}
                    psudoCode={sortingStrategy.sorter.psudoCode}
                    algoName={sortingStrategy.algoName}
                />
            </div>

            <AnimationTracker
                progress={state.progress}
                handleMoveBackWard={handleMoveBackWard}
                handleMoveForward={handleMoveForward}
                handleTogglePlayAndPause={handlePlayAndPause}
            />
        </>
    )
}

export default SortingController
