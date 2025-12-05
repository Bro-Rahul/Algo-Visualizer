import { FunctionCallStackType } from '@/types/recursion';
import clsx from 'clsx';
import { PanelRight, PanelRightOpen } from 'lucide-react';
import { useState } from 'react'
import FunctionCallStacks from './FunctionCallStacks';


interface DisplayFunctionCallStackProps {
    functionName: string,
    treeData: FunctionCallStackType<any, any> | null
}


const DisplayFunctionCallStack = ({ treeData, functionName }: DisplayFunctionCallStackProps) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div
            className={clsx(
                'absolute top-0 right-0 bottom-0 flex flex-col bg-[#121A21] rounded-br-2xl rounded-tr-2xl border-2  shadow-3xl transition-all duration-300 overflow-y-scroll scrollbar opacity-80 z-10',
                !show && 'w-[3%]', show && 'w-[30%]'
            )}
        >
            {!show
                ? <PanelRight className='self-end m-2 cursor-pointer' onClick={() => setShow(p => !p)} />
                : <PanelRightOpen className='self-end m-2 cursor-pointer rotate-180' onClick={() => setShow(p => !p)} />
            }
            <section
                className={clsx("flex flex-col h-full gap-4 overflow-y-scroll scrollbar px-2", !show && 'hidden')}>
                <h1 className='text-xl bg-[#121A21] font-semibold text-center sticky top-0 right-0 p-3'>Function Call Stack</h1>
                {treeData &&
                    <FunctionCallStacks
                        functionName={functionName}
                        functionStackData={treeData}
                    />}
            </section>
        </div>
    )
}

export default DisplayFunctionCallStack