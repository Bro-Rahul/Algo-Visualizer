import { Progress } from '../ui/progress'
import { Button } from '../ui/button'

interface ControllerProps {
    isPlayling: boolean,
    progress: number,
    inserRandomElements: (len: number) => void
    handleSorting: () => void
    togglePlayAndPause: () => void
}

const Controller = ({ isPlayling, progress, togglePlayAndPause, inserRandomElements, handleSorting }: ControllerProps) => {
    return (
        <div className='bg-secondary/50 rounded-4xl flex flex-col p-5 shadow-2xl border-2 shadow-secondary gap-3'>
            <h1 className='text-center text-xl font-bold'>Controller</h1>
            <div className='flex flex-col w-full gap-5'>
                <p className='font-normal text-md text-primary/90'>Animations Toggle State Buttons</p>
                <div className='flex w-full justify-around'>
                    <Button
                        disabled={progress === 0 || isPlayling}
                        onClick={togglePlayAndPause}
                        variant={'outline'}
                        className='outline-none cursor-pointer w-fit p-5 font-bold'
                    >
                        Play
                    </Button>
                    <Button
                        disabled={progress === 0 || !isPlayling}
                        onClick={togglePlayAndPause}
                        variant={'outline'}
                        className='outline-none cursor-pointer w-fit p-5 font-bold'
                    >
                        Pause
                    </Button>
                    <Button
                        disabled={progress !== 0}
                        onClick={handleSorting}
                        variant={'outline'}
                        className='outline-none cursor-pointer w-fit p-5 bg-green-500! font-bold'
                    >
                        Sort
                    </Button>
                </div>
                <p className='font-normal text-md text-primary/90'>Arrays Generations</p>
                <div className='flex w-full justify-around'>
                    <Button
                        disabled={progress > 0}
                        onClick={() => inserRandomElements(10)}
                        variant={'outline'}
                        className='outline-none cursor-pointer w-fit p-5 font-bold'
                    >
                        Random 10
                    </Button>
                    <Button
                        disabled={progress > 0}
                        onClick={() => inserRandomElements(5)}
                        variant={'outline'}
                        className='outline-none cursor-pointer w-fit p-5 font-bold'
                    >
                        Random 5
                    </Button>
                    <Button
                        disabled={progress > 0}
                        onClick={() => inserRandomElements(1)}
                        variant={'outline'}
                        className='outline-none cursor-pointer w-fit p-5 font-bold'
                    >
                        Random 1
                    </Button>
                </div>
                <p className='font-normal text-md text-primary/90'>Speed</p>
                <Progress
                    value={50}
                />
                <p
                    className='font-normal text-md text-primary/90'
                >
                    Sorting Completed
                </p>
                <Progress
                    value={progress}
                />
            </div>
        </div>
    )
}

export default Controller