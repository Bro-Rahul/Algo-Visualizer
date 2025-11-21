import React, { Activity } from 'react'
import clsx from 'clsx'

const PsudoCodeViewer: React.FC<{
    psudoCode: string,
    highlightLine: number,
    isAlgoRunning: boolean,
}> = ({ psudoCode, highlightLine, isAlgoRunning }) => {
    return (
        <Activity mode={isAlgoRunning ? "visible" : "hidden"}>
            <div className='w-[5%] h-screen flex flex-col items-center justify-center'>
                <div className='flex flex-row w-full overflow-visible relative'>
                    <button className='text-center flex justify-center items-center w-full'>Psudo Code</button>
                    <div className='absolute top-0 right-full w-[400px] bg-red-400 p-2 rounded-lg'>
                        <pre>
                            {psudoCode.split("\n").map((lines, idx) => <code className={clsx('block px-1 rounded-xs', idx === highlightLine && 'bg-yellow-900')} key={lines}>{lines}</code>)}
                        </pre>
                    </div>
                </div>
            </div>
        </Activity>
    )
}

export default PsudoCodeViewer