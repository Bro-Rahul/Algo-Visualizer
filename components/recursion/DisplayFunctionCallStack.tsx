import { FunctionCallStackType } from '@/types/recursion';
import clsx from 'clsx';
import { PanelRight, PanelRightOpen } from 'lucide-react';
import { useState } from 'react'


interface DisplayFunctionCallStackProps {
    treeData: FunctionCallStackType<any, any> | null
}

const DisplayFunctionCallStack = ({ treeData }: DisplayFunctionCallStackProps) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div
            className={clsx(
                'absolute top-0 right-0 bottom-0 flex flex-col bg-[#121A21] rounded-br-2xl rounded-tr-2xl border-2  shadow-3xl transition-all duration-300 overflow-y-scroll scrollbar z-10',
                !show && 'w-[3%]', show && 'w-[30%]'
            )}
        >
            {!show
                ? <PanelRight className='self-end m-2 cursor-pointer' onClick={() => setShow(p => !p)} />
                : <PanelRightOpen className='self-end m-2 cursor-pointer rotate-180' onClick={() => setShow(p => !p)} />
            }
            <section
                className={clsx("flex flex-col h-full gap-4 overflow-y-scroll scrollbar px-2", !show && 'hidden')}>
                <h1 className='text-xl font-semibold text-center'>Function Call Stack</h1>
                <div className='flex flex-col w-full p-2 bg-secondary rounded-lg border-2 shadow-2xl '>
                    Function Call 1
                </div>
            </section>
        </div>
    )
}

export default DisplayFunctionCallStack