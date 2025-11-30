import { SortingAlgo } from "@/types/arrays";
import { generateRandomNumbers } from "@/utils/arrays";
import { useRef, useState } from "react"
import SorterStrategy from "@/utils/arrays/sortingStrategy";


const useSorter = (algoName: SortingAlgo) => {
    const [elements, setElements] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [playBackSpeed, setPlayBackSpeed] = useState<number>(1)

    const svgRef = useRef<SVGSVGElement | null>(null);
    const strategyRef = useRef<SorterStrategy | null>(null);
    const isArraySorted = useRef<boolean>(false);


    if (!strategyRef.current) {
        strategyRef.current = new SorterStrategy(algoName);
    }

    const sortingStrategy = strategyRef.current;

    const addRandomElements = (total: number) => {
        setElements(pre => [...pre, ...generateRandomNumbers(total)])
        isArraySorted.current = false;
    }

    const handleSorting = () => {
        if (!isArraySorted.current) {
            setIsSorting(true);
            sortingStrategy.performSorting(elements, () => {
                togglePlayAndPause();
                setProgress(0);
                isArraySorted.current = true;
            }, updateProgress);
        }
    }

    const togglePlayAndPause = () => {
        if (isSorting) {
            sortingStrategy.sorter.stop();
        } else {
            sortingStrategy.sorter.play();
        }
        setIsSorting(pre => !pre);
    }


    const updateProgress = (val: number) => {
        setProgress(pre => val);
    }

    const updatePlayBackSpeed = (speed: number) => {
        sortingStrategy.setAnimationSpeed(speed);
        setPlayBackSpeed(speed);
    }


    return {
        elements,
        svgRef,
        sortingStrategy,
        isSorting,
        progress,
        isArraySorted,
        playBackSpeed,
        handleSorting,
        updatePlayBackSpeed,
        togglePlayAndPause,
        addRandomElements,
        setElements,
        updateProgress
    }
}

export default useSorter