"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function Dashboard() {

  const router = useRouter()

  return (
    <div className='min-h-screen bg-grey-100 flex items-center justify-center'>
      <h1 className='font-bold text-6xl gap-5'>MOMENTO</h1>
      <button onClick={()=> router.push("/dashboard")}
      className='bg-green-500 py-9 rounded-t-full'  
      >Dashboard</button>
    </div>
  )
}

export default Dashboard