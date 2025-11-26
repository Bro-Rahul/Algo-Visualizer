import { SorterStrategy } from "@/utils/arrays/animations";

const useArraySorter = () => {
    const tl = gsap.timeline();
    const sorterStrategy = new SorterStrategy();

    return {
        tl,
        sorterStrategy
    }
}

export default useArraySorter;