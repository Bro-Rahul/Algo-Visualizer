import clsx from 'clsx'

interface PsudoCodeVisualizerProps {
    psudoCode: string
}
const PsudoCodeVisualizer = ({ psudoCode }: PsudoCodeVisualizerProps) => {
    return (
        <div className='bg-secondary/50 rounded-4xl flex flex-col p-5 shadow-2xl border-2 shadow-secondary gap-3 h-full overflow-hidden'>
            <h1 className='text-center text-xl font-bold'>Psudo Code</h1>
            <div className='w-full bg-accent p-3 rounded-xl h-full overflow-y-scroll scrollbar'>
                <pre>
                    {psudoCode.split("\n").map((lines, idx) => <code id={`code-${idx}`} className={clsx(`block px-1 rounded-xs text-wrap`)} key={lines}>{lines}</code>)}
                </pre>
            </div>
        </div>
    )
}

export default PsudoCodeVisualizer