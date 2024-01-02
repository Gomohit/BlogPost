import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import {login as authLogin} from "../store/authSlice"
import {Button,Input,Logo} from "./index"
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import {useForm} from "react-hook-form"
function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState(null)
    const login =async(data)=>{
        setError("")
        try {
          const session=await authservice.login(data) 
          if (session){
            const userData=authservice.getCurrentUser()
            // console.log(userData)
            if(userData) dispatch(authLogin(userData))
            navigate('/')
          } 
        } catch (error) {
            setError(error.message)
        }    
    }
  return (
    <div className='flex items-center justify-center w-full py-5 lg:mb-32'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 flex flex-col items-center'>
            <div className='mb-2 flex align-middle '>
                <span className='inline-block w-full px-auto'>
                    <Logo width="100%" textcolor='text-blue-400'/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                    >
                        Sign Up+
                    </Link>
        </p>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input 
                label="Email:"
                placeholder="Enter your email"
                type="email"
                {...register("email",{
                    required:true,
                    validate:{
                        matchPattern:(value)=>/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.
                        test(value)||"Email address must be a valid address",
                    }
                })}
                />
                <Input 
                label="Password:"
                placeholder="Enter your password"
                type="password"
                {...register("password",{
                    required:true,
                     }
                )}
                />
                <Button type='submit' className='w-full'>Login</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login