import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full '>
      <Link href={'/arrays'}>Arrays</Link>
    </div>
  )
}

export default page