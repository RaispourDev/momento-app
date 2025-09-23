"use client" 
import Link from 'next/link'
import React from 'react'

function HomePage() {

  return (
    <div className='h-64 flex font-black text-6xl justify-center items-center'>
      <h1 className=''>MOMENTO</h1>
      <h3 className='bg-green-800 rounded-t-full p-5.5'>
      <Link href={('/dashboard')}>📷</Link></h3>
    </div>
    
  )
}

export default HomePage