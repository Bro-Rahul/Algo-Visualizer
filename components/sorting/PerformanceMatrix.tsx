

interface PerformanceMatrixProps {
    isArraySorted: boolean,
    algoName: string,
}

const PerformanceMatrix = ({ isArraySorted, algoName }: PerformanceMatrixProps) => {
    return (
        <div className='bg-secondary/50 rounded-4xl flex flex-col p-5 shadow-2xl border-2 shadow-secondary gap-3'>
            <h1 className='text-center text-xl font-bold'>Performance Matrix And Status</h1>
            <div className='flex flex-col w-full gap-5'>
                <p className='font-normal text-md text-primary/90'>Performance Matrix</p>
                <div className='grid grid-cols-2 gap-3'>
                    <p className='bg-primary/10 rounded-xl text-center text-primary/90 p-5 inline-flex flex-col gap-2 text-md font-bold '>Total Comparisions <span className='font-bold text-xl'>1</span></p>
                    <p className='bg-primary/10 rounded-xl text-center text-primary/90 p-5 inline-flex flex-col gap-2 text-md font-bold'>Total Swaps <span className='font-bold text-xl'>1</span></p>
                </div>
            </div>
            <p className="font-normal text-md text-primary/90">Algorithm</p>
            <span className='font-bold text-green-400 text-xl w-fit '>{algoName}</span>
            <p className="font-normal text-md text-primary/90">Status</p>
            {isArraySorted ?
                <span className='font-bold text-green-400 text-xl w-fit '>Sorted</span>
                : <>
                    <span className='font-bold text-red-400 text-xl w-fit '>UnSorted</span>
                </>}


        </div>
    )
}

export default PerformanceMatrix