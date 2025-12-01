"use client"
import { PanelRight, PanelRightOpen } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Controller = () => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div
            className={clsx(
                'absolute top-0 left-0 bottom-0 flex flex-col bg-[#121A21] rounded-br-2xl rounded-tr-2xl border-2  shadow-3xl transition-all duration-300 overflow-y-scroll scrollbar',
                !show && 'w-[3%]', show && 'w-[30%]'
            )}
        >
            {!show
                ? <PanelRight className='self-end m-2 cursor-pointer' onClick={() => setShow(p => !p)} />
                : <PanelRightOpen className='self-end m-2 cursor-pointer' onClick={() => setShow(p => !p)} />
            }
            <section
                className={clsx("grid grid-cols-1 grid-rows-[45%_1fr_1fr] h-full gap-4 overflow-y-scroll scrollbar", !show && 'hidden')}>
                <div className="px-5 flex flex-col gap-3">
                    <h1 className='text-xl font-semibold text-center'>Recursive Tree Inputs</h1>
                    <p className='text-lg font-semibold'>Source Code</p>
                    <textarea
                        className='flex-1 bg-[#243647] text-amber-50 w-full p-3 rounded-2xl outline-none scrollbar resize-none'
                        placeholder='Paste the Recursive code...'
                    />
                    <Button className='bg-[#1280ED] text-white font-bold text-md hover:bg-[#1280ED]/90 cursor-pointer'>
                        Submit
                    </Button>
                </div>

                <div className="px-5 flex flex-col gap-3">
                    <h1 className='text-xl font-semibold'>Input Section</h1>
                    <p>Parameter One </p>
                    <Input
                        className='bg-[#243647]'
                        placeholder='Input for parameter 1...'
                    />
                    <p>Parameter Two </p>
                    <Input
                        className='bg-[#243647]'
                        placeholder='Input for parameter 2...'
                    />
                </div>

                <div className="px-5 flex flex-col gap-3">
                    <h1 className='text-xl font-semibold'>Function Call</h1>
                    <textarea
                        className='flex-1 bg-[#243647] text-amber-50 w-full p-3 rounded-2xl outline-none scrollbar resize-none'
                        placeholder='Paste something else...'
                    />
                </div>

            </section>
        </div>
    )
}

export default Controller
