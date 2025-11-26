import React from 'react'
import clsx from 'clsx'

const PsudoCodeViewer: React.FC<{
    psudoCode: string,
    highlightLine: number,
    isAlgoRunning: boolean,
    algoName?: string
}> = ({ psudoCode, highlightLine, isAlgoRunning, algoName }) => {
    const temp = `for i = 0 to n - 2:
        min_index = i
        for j = i + 1 to n - 1:
            if array[j] < array[min_index]:
                min_index = j
        swap(array[i], array[min_index])   `
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-2'>
                <p className='text-center w-full inline-block text-black font-semibold bg-white rounded-xl p-2'>Psudo Code {algoName && <span>for {algoName}</span>}</p>
                <div className=' w-[600px] bg-red-400 p-2 rounded-lg'>
                    <pre>
                        {temp.split("\n").map((lines, idx) => <code id={`code-${idx}`} className={clsx(`block px-1 rounded-xs text-wrap`, idx === highlightLine && 'bg-yellow-900')} key={lines}>{lines}</code>)}
                    </pre>
                </div>
            </div>
        </div>
    )
}


export default PsudoCodeViewer