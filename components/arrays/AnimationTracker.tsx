import { Progress } from "@/components/ui/progress"
import { CircleMinus, Play } from 'lucide-react';
import { CirclePause } from 'lucide-react';
import { FastForward } from 'lucide-react';
import React, { Activity } from "react";
import { CircleGauge } from 'lucide-react';
import { CirclePlus } from 'lucide-react';




const AnimationTracker: React.FC<{
    progress: number,
    isPause: boolean,
    playBackSpeed: number,
    handleTogglePlayAndPause: () => void
    handleMoveForward: () => void,
    handleMoveBackWard: () => void,
    handlePlayBackSpeed: (speed: number) => void
}> = ({ progress, isPause, playBackSpeed, handleMoveBackWard, handleMoveForward, handleTogglePlayAndPause, handlePlayBackSpeed }) => {
    return (
        <Activity mode={(progress > 0 && progress < 100) ? "visible" : "hidden"}>
            <div className="absolute bottom-15 left-[8%] right-[50%] h-fit flex flex-col justify-centers items-center gap-5">
                <Progress value={progress} />
                <div className="flex flex-row items-center gap-11">
                    <div className="flex gap-2">
                        <FastForward onClick={handleMoveBackWard} className="rotate-180" />
                        {isPause && <Play onClick={handleTogglePlayAndPause} />}
                        {!isPause && <CirclePause onClick={handleTogglePlayAndPause} />}
                        <FastForward onClick={handleMoveForward} />
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <CirclePlus onClick={() => handlePlayBackSpeed(1)} />
                        <CircleMinus onClick={() => handlePlayBackSpeed(-1)} />
                        <CircleGauge />
                        <span className="font-bold text-xl ">
                            {playBackSpeed} X
                        </span>
                    </div>

                </div>
            </div>
        </Activity>
    )
}

export default AnimationTracker