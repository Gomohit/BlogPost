import React from 'react'
import { useNavigate } from 'react-router-dom'
function NotFound() {
    const navigate=useNavigate()
    const handleNotFound=()=>{
        navigate('/')
    }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl font-semibold mt-4">Not Found</p>
        <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
        <button className='p-3 mt-3 bg-blue-600 rounded-md text-base text-white font-semibold' onClick={handleNotFound}>Back To Home</button>
      </div>
    </div>
  )
}

export default NotFound