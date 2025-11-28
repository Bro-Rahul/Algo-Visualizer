import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
    return (
        <header className="bg-primary border-b border-slate-700/50 dark:border-slate-700/50">
            <div className="container mx-auto px-8 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.353 3.128a3.125 3.125 0 015.294 0l6.353 10.165a3.125 3.125 0 01-2.647 4.717H6.647a3.125 3.125 0 01-2.647-4.717L6.353 3.128zM12 19.375a3.125 3.125 0 002.647-4.717L8.294 4.493a.625.625 0 00-1.058 0L.882 14.658a3.125 3.125 0 002.647 4.717H12z"></path>
                        </svg>
                        <span className="text-xl font-bold text-slate-100 dark:text-slate-100">Algo Visualizer</span>
                    </div>
                </div>
                <div className="w-full max-w-xs relative space-x-2 flex justify-end ">
                    <Button className='cursor-pointer' variant={'secondary'}>Algorithms</Button>
                    <Button className='cursor-pointer' variant={'secondary'}>About</Button>
                    <Button className='cursor-pointer' variant={'destructive'}>Sign IN</Button>
                </div>
            </div>
        </header>
    )
}

export default Header