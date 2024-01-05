import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogOutBtn() {
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authservice.logOut().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-6  py-2 duration-200 text-white hover:bg-blue-100 rounded-full dark:hover:bg-black' onClick={logoutHandler}>Logout</button>
  )
}
export default LogOutBtn