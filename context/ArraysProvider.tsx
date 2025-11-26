import { SorterStrategy } from '@/utils/arrays/animations'
import React, { createContext, useRef } from 'react'
import gsap from 'gsap'

interface ArraysProviderContextType {
    elements: number[],
    sortingStrategy: SorterStrategy,
    tl: gsap.core.Timeline,
    svgRef: React.RefObject<SVGSVGElement | null> | null
}


const initailValue: ArraysProviderContextType = {
    elements: [],
    svgRef: null,
    tl: gsap.timeline(),
    sortingStrategy: new SorterStrategy()
}
export const ArraysProviderContent = createContext<ArraysProviderContextType>(initailValue)

const ArraysProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const ref = useRef<SVGSVGElement | null>(null);
    return (
        <ArraysProviderContent.Provider value={{ ...initailValue, svgRef: ref }}>
            {children}
        </ArraysProviderContent.Provider>
    )
}

export default ArraysProvider