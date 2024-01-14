import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({children, authentication=true}) {
    console.log(children)
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)
    const authStatus=useSelector((state)=>state.auth.status)

    useEffect(()=>{
        if (authentication && authStatus!=authentication) {
            navigate('/login')
        } else if(!authentication && authStatus!==authentication) {
            navigate('/')   
        }
        setLoading(false)
    },[authStatus,navigate,authentication])
  return loading?
        <div className="flex flex-col items-center justify-center spinner-container my-52">
            <div className="border-t-2 border-blue-500 border-solid h-10 w-10 rounded-full animate-spin"></div>
            <p className='text-center font-sans font-normal text-base mt-1'>loading...</p>
        </div>:<>{children}</>
}

