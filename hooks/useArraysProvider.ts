import { useContext } from "react";
import { ArraysProviderContent } from "@/context/ArraysProvider";
import { generateArrays } from "@/utils/arrays";

const useArraysProvider = () => {

    const { elements, svgRef } = useContext(ArraysProviderContent);


    const insertNewElement = () => {
        elements.push(Math.floor(Math.random() * 100));
        generateArrays(elements);
    }

    return {
        elements,
        svgRef,
        insertNewElement
    }
}

export default useArraysProvider;
