import { useState } from "react"
import { Slider } from "../ui/slider"


interface SpeedControllerProps {
  animationSpeed: number,
  setAnimationSpeed: (speed: number) => void
}
const SpeedController = ({ animationSpeed, setAnimationSpeed }: SpeedControllerProps) => {

  return (
    <div className="w-full">
      <p className='font-normal text-md text-primary/90'>Speed</p>

      <p className="flex w-full justify-between">
        {[0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map(item => (
          <span key={item}>
            {item}X
          </span>
        ))}
      </p>

      <Slider
        value={[animationSpeed]}
        min={0}
        max={4}
        step={0.5}
        onValueChange={(val) => setAnimationSpeed(val[0])}
        className="mt-2 bg-secondary"
      />
    </div>
  )
}

export default SpeedController
