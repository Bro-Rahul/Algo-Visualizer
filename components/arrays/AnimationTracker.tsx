import { Progress } from "@/components/ui/progress"
import { CircleMinus, Play } from 'lucide-react';
import { CirclePause } from 'lucide-react';
import { FastForward } from 'lucide-react';
import React, { Activity } from "react";
import { CircleGauge } from 'lucide-react';
import { CirclePlus } from 'lucide-react';




const AnimationTracker: React.FC<{
    progress: number,
    handleTogglePlayAndPause: () => void
    handleMoveForward: () => void,
    handleMoveBackWard: () => void
}> = ({ progress, handleMoveBackWard, handleMoveForward, handleTogglePlayAndPause }) => {
    return (
        <Activity mode={(progress > 0 && progress < 100) ? "visible" : "hidden"}>
            <div className="absolute bottom-15 left-[8%] right-[50%] h-fit flex flex-col justify-centers items-center gap-5">
                <Progress value={progress} />
                <div className="flex flex-row items-center gap-11">
                    <div className="flex gap-2">
                        <FastForward onClick={handleMoveBackWard} className="rotate-180" />
                        <Play onClick={handleTogglePlayAndPause} />
                        <CirclePause onClick={handleTogglePlayAndPause} />
                        <FastForward onClick={handleMoveForward} />
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <CirclePlus />
                        <CircleMinus />
                        <CircleGauge />
                        <span className="font-bold text-xl ">
                            1X
                        </span>
                    </div>

                </div>
            </div>
        </Activity>
    )
}

export default AnimationTracker