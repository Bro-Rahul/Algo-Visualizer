"use client"
import { PanelRight, PanelRightOpen } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FunctionMetaDetails } from '@/types/recursion'
import { getFormatedCode } from '@/utils/recursion'
import { FunctionCallStackType } from '@/types/recursion'

interface ControllerProps {
    functionMetaDetails: FunctionMetaDetails,
    handleSetResult: (result: FunctionCallStackType<any, any>) => void
    handleCodeSubmit: (code: string) => void,
    handleSetInputParameters: (idx: number, val: string) => void
}

const Controller = ({ functionMetaDetails, handleSetResult, handleCodeSubmit, handleSetInputParameters }: ControllerProps) => {
    const [show, setShow] = useState<boolean>(true);
    const [code, setCode] = useState<string>('');

    const handleRun = async () => {
        const template = getFormatedCode(code, functionMetaDetails.params, functionMetaDetails.functionName);
        const response = await fetch("http://localhost:3000/api/submit", {
            method: "POST",
            body: JSON.stringify({
                "code": template
            })
        })
        if (!response.ok) {

        } else {
            const data = await response.json()
            // typecasting to any as we can't get the exact types as we do not have the actula user function in the code 
            const result = (JSON.parse(data)) as FunctionCallStackType<any, any>;
            handleSetResult(result);
        }
    }

    return (
        <div
            className={
                clsx('absolute top-0 left-0 bottom-0 flex flex-col bg-[#121A21] rounded-br-2xl rounded-tr-2xl border-2  shadow-3xl transition-all duration-300 overflow-y-scroll scrollbar opacity-80 z-10',
                    !show && 'w-[3%]',
                    show && 'w-[30%]')}
        >
            {!show
                ? <PanelRight className='m-2 cursor-pointer' onClick={() => setShow(p => !p)} />
                : <PanelRightOpen className='m-2 cursor-pointer' onClick={() => setShow(p => !p)} />
            }
            <section
                className={clsx("grid grid-cols-1 grid-rows-[45%_1fr] h-full gap-4 overflow-y-scroll scrollbar", !show && 'hidden')}>
                <div className="px-5 flex flex-col gap-3">
                    <h1 className='text-xl font-semibold text-center'>Recursive Function Inputs</h1>
                    <p className='text-xl font-semibold border-b-4 '>Source Code</p>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className='flex-1 bg-[#243647] text-amber-50 w-full p-3 rounded-2xl outline-none scrollbar resize-none'
                        placeholder='Paste the Recursive code...'
                    />
                    <Button onClick={() => handleCodeSubmit(code)} className='bg-[#1280ED] text-white font-bold text-md hover:bg-[#1280ED]/90 cursor-pointer'>
                        Submit Code
                    </Button>
                </div>

                <div className='flex flex-col w-full gap-5'>
                    <div className="px-5 flex flex-col gap-3">
                        <h1 className='text-xl font-semibold border-b-4'>Function List</h1>
                        {functionMetaDetails?.functionName && <p className='py-2 px-4 border-2 rounded-xl font-semibold text-md'>{functionMetaDetails.functionName}</p>}
                    </div>
                    <div className="px-5 flex flex-col gap-3">
                        <h1 className='text-xl font-semibold border-b-4'>Inputs Section</h1>
                        {functionMetaDetails?.params.map((params, idx) =>
                            <div key={params.key} className='p-1 flex flex-col gap-1'>
                                <p>Parameter {params.key} : {params.keyType}</p>
                                <Input
                                    value={functionMetaDetails.params[idx].parameterVal}
                                    onChange={e => handleSetInputParameters(idx, e.target.value)}
                                    className='bg-[#243647]'
                                    placeholder={`Value of ${params.key}`}
                                />
                            </div>)}
                    </div>
                    <Button onClick={handleRun} className='bg-[#1280ED] text-white font-bold text-md hover:bg-[#1280ED]/90 cursor-pointer mx-5'>
                        Run Code
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Controller
