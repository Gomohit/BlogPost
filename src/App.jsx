import React,{ useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import './App.css'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authservice.getCurrentUser() 
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else dispatch(logout())
    })
    .finally(()=>setLoading(false))
  },[])
   

  return !loading ?(
    <div className='flex flex-col justify-normal bg-white mb-0'>
      <div className="w-full">

        <Header/>
        {/* <main> */}
          <Outlet/>
        {/* </main> */}
        <Footer/>
      </div>
   </div>
  ):null
}

export default App


