import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FunctionCallStackType, SimpleFunctionCallStackType } from "@/types/recursion"
import { formateData } from "@/utils/recursion/index"
import { useEffect } from "react"

interface FunctionCallStacksProps {
    functionStackData: FunctionCallStackType<any, any>
    functionName: string,
}


const FunctionCallStacks = ({ functionName, functionStackData }: FunctionCallStacksProps) => {
    const result: SimpleFunctionCallStackType[] = [];
    formateData(functionStackData, result);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {

                }
            },
            { threshold: 1 }
        );
    }, []);

    return (
        <Accordion type="multiple" className=''>
            {result.map(item => (
                <AccordionItem key={item.id} value={`${item.id}`} className='bg-[#243647] rounded-xl px-3 '>
                    <AccordionTrigger className='font-bold text-lg text-wrap underline-none border-b-2  cursor-pointer '>{functionName} {item.id}</AccordionTrigger>
                    <AccordionContent className='p-2 font-semibold'>
                        <span className="block">ID {item.id}</span>
                        <span className="block">children {item.children.join(", ")}</span>
                        <span className="block">params {item.params.join(", ")}</span>
                        <span className="block">Returned Val {item.returnVal}</span>
                        <span className="block">Parent {item.parent !== null ? item.parent : "first Function Call"}</span>

                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default FunctionCallStacks