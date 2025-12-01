import Link from 'next/link'
import React from 'react'
interface PageProps {
    params: {
        slug: Promise<string>
    }
}

const page: React.FC<PageProps> = async ({ params }) => {
    const { slug } = await params
    return (
        <div>Details Blog page for this Algo here in later Updates <Link className='underline text-blue-700' href={`/sorting/${slug}/visualizer`}>{slug}</Link></div>
    )
}

export default page