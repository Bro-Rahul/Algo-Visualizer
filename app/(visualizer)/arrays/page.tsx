"use client"
import ArraysCanvas from "@/components/arrays/ArraysCanvas"
import ArraysOperationMenus from "@/components/arrays/ArraysOperationMenus";
import useArraysProvider from "@/hooks/useArraysProvider"

const page = () => {
    const { insertNewElement } = useArraysProvider();
    return (
        <div className="flex w-full h-screen">
            <ArraysOperationMenus />
            <ArraysCanvas />
            <div className="flex flex-col w-[5%] h-screen">
                this is first
            </div>

        </div>
    )
}

export default page