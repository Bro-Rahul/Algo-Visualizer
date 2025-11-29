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
        <div>page <Link href={`/sorting/${slug}/visualizer`}>{slug}</Link></div>
    )
}

export default page