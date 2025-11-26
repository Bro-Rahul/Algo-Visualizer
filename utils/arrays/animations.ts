import gsap from "gsap/all";
import * as d3 from "d3"
import { SequenceTupleType } from "@/types/arrays";

export abstract class BaseSorter {
    tl = gsap.timeline();
    psudoCode: string;
    baseX: number
    baseY: number;

    constructor(x: number, y: number, code: string) {
        this.baseX = x;
        this.baseY = y;
        this.psudoCode = code;
    }

    abstract sort(elements: number[], nodes: d3.BaseType[]): SequenceTupleType[]

    swap(sequenceTuple: SequenceTupleType, nodes: d3.BaseType[]) {
        const LIFT_Y = 100;
        const [srcIdx, targetIdx, highLigthLine] = sequenceTuple.args;

        if (srcIdx !== targetIdx) {
            const srcGrp = d3.select(nodes[srcIdx]);
            const targetGrp = d3.select(nodes[targetIdx]);

            this.tl.to(`#code-${highLigthLine}`, {
                backgroundColor: "black",
                duration: 0.2
            });

            this.tl.to(srcGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * srcIdx},${LIFT_Y})` },
                onStart: () => { srcGrp.select("rect").attr("fill", "red") }
            }, "<");

            this.tl.to(targetGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * targetIdx},${LIFT_Y})` },
                onStart: () => { targetGrp.select("rect").attr("fill", "orange") }
            }, "<");

            this.tl.to(srcGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * targetIdx},${LIFT_Y})` },
            });

            this.tl.to(targetGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * srcIdx},${LIFT_Y})` }
            }, "<");

            this.tl.to(srcGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * targetIdx},${this.baseY})` },
                onComplete: () => { srcGrp.select("rect").attr("fill", "transparent") }
            });

            this.tl.to(targetGrp.node(), {
                duration: .6,
                attr: { transform: `translate(${this.baseX + 55 * srcIdx},${this.baseY})` },
                onComplete: () => {
                    targetGrp.select("rect").attr("fill", "transparent");
                    d3.select(`#code-${highLigthLine}`).style("background-color", "transparent");
                }
            }, "<");

            const temp = nodes[srcIdx];
            nodes[srcIdx] = nodes[targetIdx];
            nodes[targetIdx] = temp;
        }
    }


    highLigth(sequenceTuple: SequenceTupleType, nodes: d3.BaseType[]) {
        this.tl.to(`#code-${sequenceTuple.args[1]}`, {
            backgroundColor: "black",
            duration: 0.1,
            yoyo: true,
            repeat: 1
        }, ">")
    }

    movePointer(sequenceTuple: SequenceTupleType, nodes: d3.BaseType[]) {
        this.highLigth(sequenceTuple, nodes)
    }

    stop() {
        this.tl.pause();
    }

    play() {
        this.tl.play();
    }

    isPaused() {
        return this.tl.paused();
    }

    abstract destroyPointer(): void
}
