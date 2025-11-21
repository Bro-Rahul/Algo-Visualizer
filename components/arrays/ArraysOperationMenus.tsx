import useArraysProvider from "@/hooks/useArraysProvider";
import { generateArrays, generateRandomNumbers } from "@/utils/arrays";
import clsx from "clsx"
import React, { Activity, useState } from "react"

const ArraysOperationMenus: React.FC<{
    isSorting: boolean,
}> = ({ isSorting }) => {

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { elements, insertNewElement } = useArraysProvider();


    const handleGenerateRandom = () => {
        elements.push(...generateRandomNumbers(10))
        generateArrays(elements)
    }

    return (
        <div className='w-[5%] h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-row w-full overflow-visible relative'>
                <button onClick={() => setShowMenu(pre => !pre)} className='bg-white p-5 rounded-2xl text-black w-full cursor-pointer'>Open</button>
                <Activity mode={(showMenu && !isSorting) ? "visible" : "hidden"}>
                    <div className={clsx('absolute top-0 left-[110%] w-[250px] max-h-[300px] bg-white rounded-lg p-2 overflow-y-scroll transition-all duration-300')}>
                        <button onClick={handleGenerateRandom} className='text-black text-start font-medium text-wrap p-1 w-full cursor-pointer hover:bg-gray-400/50'>Generate Random Arrays</button>
                        <button onClick={insertNewElement} className='text-black text-start font-medium text-wrap p-1 w-full cursor-pointer hover:bg-gray-400/50'>Insert One</button>
                    </div>
                </Activity>
            </div>
        </div>
    )
}

export default ArraysOperationMenus