import { useContext } from "react";
import { ArraysProviderContent } from "@/context/ArraysProvider";
import { generateArrays, generateRandomNumbers } from "@/utils/arrays";

const useArraysProvider = () => {

    const { elements, svgRef, sortingStrategy } = useContext(ArraysProviderContent);


    const insertNewElement = () => {
        elements.push(Math.floor(Math.random() * 100));
        generateArrays(elements, svgRef?.current!);
    }

    const addRandomElements = (count: number) => {
        elements.push(...generateRandomNumbers(count))
        generateArrays(elements, svgRef?.current!);
    }

    return {
        elements,
        svgRef,
        sortingStrategy,
        insertNewElement,
        addRandomElements
    }
}

export default useArraysProvider;
