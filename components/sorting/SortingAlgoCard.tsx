import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SortingAlgoCard: React.FC<{
    svg: string,
    title: string
    description: string,
    href: string
}> = ({ title, description, svg, href }) => {
    return (
        <Link href={href} >
            <div className="card">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#232f48] text-white">
                        <Image className='fill-white' src={svg} alt='icon' width={100} height={100} />
                    </div>
                    <p className="text-white text-lg font-semibold">{title}</p>
                </div>

                <p className="text-[#92a4c9] text-sm">{description}</p>
            </div>
        </Link>
    )
}

export default SortingAlgoCard