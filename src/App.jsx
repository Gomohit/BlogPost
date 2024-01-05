import React,{ useState,useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './store/store'
import authservice from './appwrite/auth'
import './App.css'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  const themeMode=useSelector((state)=>state.auth.theme)
  console.log(themeMode)
  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(themeMode)
  },[themeMode])
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
    <Provider store={store}>
    <div className='flex flex-col justify-normal bg-white mb-0 dark:bg-gray-700'>
      <div className="w-full dark:bg-gray-700">
        <Header/>
          <Outlet/>
        <Footer/>
      </div>
   </div>
  </Provider> 
  ):(
    <div className="flex flex-col items-center justify-center spinner-container my-52">
                <div className="border-t-2 border-blue-500  border-solid h-10 w-10 rounded-full animate-spin"></div>
                <p className='text-center font-sans font-normal text-base mt-1 dark:text-gray-300'>loading...</p>
    </div>
  )
}

export default App


