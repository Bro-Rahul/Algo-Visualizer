import { SorterStrategy } from '@/utils/arrays/sortingAlgorithms'
import React, { createContext, useRef } from 'react'

interface ArraysProviderContextType {
    elements: number[],
    sortingStrategy: SorterStrategy,
    svgRef: React.RefObject<SVGSVGElement | null> | null
}


const initailValue: ArraysProviderContextType = {
    elements: [],
    svgRef: null,
    sortingStrategy: new SorterStrategy()
}
export const ArraysProviderContent = createContext<ArraysProviderContextType>(initailValue)

const ArraysProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const ref = useRef<SVGSVGElement | null>(null);
    return (
        <ArraysProviderContent.Provider value={{ ...initailValue, elements: [], svgRef: ref }}>
            {children}
        </ArraysProviderContent.Provider>
    )
}

export default ArraysProvider