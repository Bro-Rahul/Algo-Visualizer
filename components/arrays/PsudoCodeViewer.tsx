import React, { Activity } from 'react'
import clsx from 'clsx'

const PsudoCodeViewer: React.FC<{
    psudoCode: string,
    highlightLine: number,
    isAlgoRunning: boolean,
    algoName?: string
}> = ({ psudoCode, highlightLine, isAlgoRunning, algoName }) => {
    return (
        <Activity mode={isAlgoRunning ? "visible" : "hidden"}>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2'>
                    <p className='text-center w-full inline-block text-black font-semibold bg-white rounded-xl p-2'>Psudo Code {algoName && <span>for {algoName}</span>}</p>
                    <div className=' w-[400px] bg-red-400 p-2 rounded-lg'>
                        <pre>
                            {psudoCode.split("\n").map((lines, idx) => <code className={clsx('block px-1 rounded-xs text-wrap', idx === highlightLine && 'bg-yellow-900')} key={lines}>{lines}</code>)}
                        </pre>
                    </div>
                </div>
            </div>
        </Activity>
    )
}


export default PsudoCodeViewer