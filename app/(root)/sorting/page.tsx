import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { SortingAlgoDetails } from '@/constants/data'
import SortingAlgoCard from '@/components/sorting/SortingAlgoCard'

const page = () => {
    return (
        <section className="container mx-auto px-20 py-5">
            <h1 className="text-3xl font-bold mb-2">Sorting Algorithm Overview</h1>
            <p className="text-[#91ADC9] font-medium">
                Explore a comprehensive list of sorting algorithms, each with a detailed description and visual representation.
            </p>

            <div className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-lg px-4 py-2 mt-4">
                <Search className="text-[#91ADC9]" size={20} />

                <Input
                    placeholder="Search"
                    className="
                        border-none shadow-none focus-visible:ring-0 
                        p-0 bg-transparent! text-inherit placeholder:text-secondary-foreground/60
                    "
                />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 py-4">
                {SortingAlgoDetails.map((item, idx) =>
                    <SortingAlgoCard
                        href={`/sorting/${item.href}`}
                        description={item.description}
                        svg={item.svg}
                        title={item.name}
                        key={idx} />)}
            </div>
        </section>
    )
}

export default page
