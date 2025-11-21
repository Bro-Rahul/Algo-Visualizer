import useArraysProvider from "@/hooks/useArraysProvider";
import { generateArrays, generateRandomNumbers, swap } from "@/utils/arrays";
import clsx from "clsx"
import { useState } from "react"
import { SorterStrategy } from "@/utils/arrays/sortingAlgorithms";

const ArraysOperationMenus = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { elements } = useArraysProvider();
    const sorter = new SorterStrategy();


    const handleGenerateRandom = () => {
        elements.push(...generateRandomNumbers(10))
        generateArrays(elements)
    }

    return (
        <div className='w-[5%] h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-row w-full overflow-visible relative'>
                <button onClick={() => setShowMenu(pre => !pre)} className='bg-white p-5 rounded-2xl text-black w-full cursor-pointer'>Open</button>
                <div className={clsx('absolute top-0 left-[110%] w-[250px] max-h-[300px] bg-white rounded-lg p-2 overflow-y-scroll transition-all duration-300', !showMenu && 'opacity-0')}>
                    <button onClick={handleGenerateRandom} className='text-black text-start font-medium text-wrap p-1 w-full cursor-pointer hover:bg-gray-400/50'>Generate Random Arrays</button>
                    <button className='text-black text-start font-medium text-wrap p-1 w-full cursor-pointer hover:bg-gray-400/50'>Insert One</button>
                    <button onClick={async () => await sorter.performSorting(elements)} className='text-black text-start font-medium text-wrap p-1 w-full cursor-pointer hover:bg-gray-400/50'>Sort Array</button>
                </div>
            </div>
        </div>
    )
}

export default ArraysOperationMenus