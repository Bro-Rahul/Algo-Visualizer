import React, { createContext, useRef } from 'react'

interface ArraysProviderContextType {
    elements: number[],
    svgRef: React.RefObject<SVGSVGElement | null> | null
}

export const ArraysProviderContent = createContext<ArraysProviderContextType>({
    elements: [],
    svgRef: null,
})

const ArraysProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const ref = useRef<SVGSVGElement | null>(null);
    return (
        <ArraysProviderContent.Provider value={{ elements: [], svgRef: ref }}>
            {children}
        </ArraysProviderContent.Provider>
    )
}

export default ArraysProvider