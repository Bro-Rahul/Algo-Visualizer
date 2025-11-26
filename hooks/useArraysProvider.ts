import { useContext } from "react";
import { ArraysProviderContent } from "@/context/ArraysProvider";
import { generateArrays } from "@/utils/arrays";

const useArraysProvider = () => {

    const { elements, svgRef, sortingStrategy, tl } = useContext(ArraysProviderContent);


    const insertNewElement = () => {
        elements.push(Math.floor(Math.random() * 100));
        generateArrays(elements);
    }

    return {
        elements,
        svgRef,
        sortingStrategy,
        tl,
        insertNewElement
    }
}

export default useArraysProvider;
