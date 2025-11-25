import React from 'react'
import PsudoCodeViewer from './PsudoCodeViewer'
import SelectSortingAlgo from './SelectSortingAlgo'
import useArraysProvider from '@/hooks/useArraysProvider'
import { Button } from '../ui/button'
import { selectionSort } from '@/utils/arrays/sortingAlgorithms'
import gsap from 'gsap'
import * as d3 from "d3"
import { parseTransformAttribute } from '@/utils/arrays'

const SortingController: React.FC<{
    highlightCurrentLine: (lineNumber: number) => void
    currentLine: number,
}> = ({ highlightCurrentLine, currentLine }) => {
    const { sortingStrategy, elements } = useArraysProvider();
    /* const handleSort = async () => {
        await sortingStrategy.performSorting(elements, highlightCurrentLine);
    } */

    const tl = gsap.timeline();
    const handleSelectionSort = () => {
        const sequence = selectionSort(elements);
        const nodes = d3.select("svg").selectAll("g").nodes();

        console.log(sequence);
        // Extract original X & Y
        const firstTransform = d3.select(nodes[0])
            .attr("transform")
            .match(parseTransformAttribute)!;

        const baseX = +firstTransform[1];
        const baseY = +firstTransform[2];
        const LIFT_Y = 100;
        const animation = sequence.map(([srcIdx, targetIdx]) => {
            if (srcIdx !== targetIdx) {
                const srcGrp = d3.select(nodes[srcIdx]);
                const targetGrp = d3.select(nodes[targetIdx]);

                tl.to(srcGrp.node(), {
                    duration: .6,
                    attr: {
                        transform: `translate(${baseX + 55 * srcIdx},${LIFT_Y})`
                    },
                    onStart: () => {
                        srcGrp.select("rect").attr("fill", "red")
                    }
                })
                tl.to(targetGrp.node(), {
                    duration: .6,
                    attr: {
                        transform: `translate(${baseX + 55 * targetIdx},${LIFT_Y})`
                    },
                    onStart: () => {
                        targetGrp.select("rect").attr("fill", "orange")
                    }
                }, "<")

                tl.to(srcGrp.node(), {
                    duration: .6,
                    attr: {
                        transform: `translate(${baseX + 55 * targetIdx},${LIFT_Y})`
                    },
                })
                tl.to(targetGrp.node(), {
                    duration: .6,
                    attr: {
                        transform: `translate(${baseX + 55 * srcIdx},${LIFT_Y})`
                    }
                }, "<")



                tl.to(srcGrp.node(), {
                    duration: .6,
                    attr: {
                        transform: `translate(${baseX + 55 * targetIdx},${baseY})`
                    },
                    onComplete: () => {
                        srcGrp.select("rect").attr("fill", "transparent")
                    }
                })
                tl.to(targetGrp.node(), {
                    duration: .6,
                    attr: {
                        transform: `translate(${baseX + 55 * srcIdx},${baseY})`
                    },
                    onComplete: () => {
                        targetGrp.select("rect").attr("fill", "transparent")
                    }
                }, "<")

                const temp = nodes[srcIdx];
                nodes[srcIdx] = nodes[targetIdx];
                nodes[targetIdx] = temp;
            }
        });

    };



    return (
        <div className='h-screen w-fit absolute top-0 right-0 flex flex-col justify-between py-5 items-end px-3'>
            <SelectSortingAlgo isSorting={currentLine !== -1}>
                {/* <Button disabled={currentLine !== -1} onClick={handleSort} className="px-5 py-2 cursor-pointer bg-white text-black rounded-xl ">Sort</Button> */}
                <Button disabled={currentLine !== -1} onClick={handleSelectionSort} className="px-5 py-2 cursor-pointer bg-white text-black rounded-xl ">Selection Sort</Button>
                <Button disabled={currentLine !== -1} onClick={() => {
                    if (tl.paused()) {
                        tl.play()
                    } else {
                        tl.pause();
                    }
                }} className="px-5 py-2 cursor-pointer bg-white text-black rounded-xl ">STOP</Button>
            </SelectSortingAlgo>
            <PsudoCodeViewer psudoCode={sortingStrategy.sorter.psudoCode} algoName={sortingStrategy.algoName} highlightLine={currentLine} isAlgoRunning={currentLine !== -1} />
        </div>
    )
}

export default SortingController