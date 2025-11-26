"use client"
import ArraysCanvas from "@/components/arrays/ArraysCanvas"
import ArraysOperationMenus from "@/components/arrays/ArraysOperationMenus";
import SortingController from "@/components/arrays/SortingController";
import { useState } from "react";

const page = () => {
    const [isSorting, setIsSorting] = useState<boolean>(false);

    return (
        <div className="flex w-full h-screen gap-2">
            <ArraysOperationMenus isSorting={isSorting} />
            <ArraysCanvas />
            <SortingController isSorting={isSorting} setIsSorting={setIsSorting} />
        </div>
    )
}

export default page