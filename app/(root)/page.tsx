import { Button } from "@/components/ui/button";
import { ChartBarIncreasing } from 'lucide-react';
import Link from "next/link";

const Page = () => {
  return (
    <div className='container mx-auto px-72 py-10 flex flex-col gap-10 h-full'>
      <div className="bg-secondary w-full p-2 h-[65%] bg-hero rounded-2xl  flex flex-col justify-center items-center gap-1">
        <h1 className="font-extrabold text-3xl">Algorithm Visualizations</h1>
        <p className="text-lg text-center font-normal">
          Explore a variety of algorithms through interactive visualizations. Select a category to learn more and see them in action.
        </p>
        <Button className="bg-blue-600 text-white font-bold">Get Started</Button>
      </div>
      <h2 className="font-bold text-xl">Algorithm Category</h2>
      <div className="w-full flex gap-5 flex-wrap">
        <Link href="/sorting" className="bg-secondary p-5 rounded-xl flex gap-2 cursor-pointer">
          <ChartBarIncreasing className="-rotate-90" />
          <p className="font-bold text-md">Sorting Algorithms </p>
        </Link>
        <Link href="/recursion" className="bg-secondary p-5 rounded-xl flex gap-2 cursor-pointer">
          <ChartBarIncreasing className="-rotate-90" />
          <p className="font-bold text-md">Recursion Tree  </p>
        </Link>
      </div>
    </div>
  );
};

export default Page;
