import React from 'react'
import { useEffect,useState } from 'react'
import databaseservice from '../appwrite/configuration'
import { Container,PostCard } from '../components'
import { useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'

function Home() {
    const navigate=useNavigate()
    const status=useSelector((state)=>state.auth.status)
    const [posts,setPosts]=useState([])

    useEffect(()=>{
        const fetchPosts = async () => {
            try {
              const fetchedPosts = await databaseservice.getPosts([]);
              if (fetchedPosts) {
                setPosts(fetchedPosts.documents);
              }
            } catch (error) {
                throw error
            }
          };
      
        fetchPosts();
    },[])
    if(posts.length==0){
        return (
                <div className="w-full py-8  text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full mt-10 items-center flex justify-center">
                                {status?(<div className='w-[400px] shadow-lg  border border-gray-100 p-5 flex flex-col items-center align-middle justify-center'>
                                    <h1 className='w-full font-medium text-2xl mb-4'>You don&apos;t have post to see</h1>
                                    <h4 className=' mb-5'>Add Post From here
                                    </h4>
                                    <div className='flex justify-center gap-3'>
                                    <Link to='/add-post' className='bg-blue-400 px-4 py-3 rounded-xl text-white text-lg font-semibold'> Add Post </Link>
                                    </div>
                                    </div>):(<div className='w-[400px] shadow-lg  border border-gray-100 p-5 flex flex-col items-center align-middle justify-center'>
                                    <h1 className='w-full font-bold text-2xl mb-4'>To Create an Account</h1>
                                    <h4 className=' mb-5'>Already have an Account?
                                    <Link to='/login' className=' text-blue-400 text-lg '>&nbsp; Login</Link>
                                    </h4>
                                    <div className='flex justify-center gap-3'>
                                    <Link to='/Signup' className='bg-blue-400 px-4 py-3 rounded-xl text-white text-xl font-semibold'>Signup</Link>
                                    </div>
                                    </div>)}
                            </div>

                            <div className=' w-full flex flex-col mt-12 mb-4'>
                                <div className='text-2xl font-bold text-left py-10'>
                                    Follow Instruction:
                                </div>
                                <ul className='flex flex-col justify-start'>
                                    <li className='w-full text-xl text-left pb-4 font-sans'>
                                       1. You need to Login to see the post if you have any account login using your credentials such as (email,password).
                                    </li>
                                    <li className='w-full text-xl text-left pb-4 font-sans'>
                                        2. If you don&apos;t have any account signup for create the account using basic details (name,email,password).
                                    </li>
                                    <li className='w-full text-xl text-left pb-4 font-sans'>
                                        3. When you are login if posts are not shown so there is no previous data added by you, then you need to add the post which shown on your home page. 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Container>
    </div>
        )
    }
    else{
        return(
            <div className='w-full py-8'>
                <Container>
                    <h2 className='w-full text-xl font-serif text-left mb-5'>If you want to edit or delete the post click on post</h2>
                    <div className='flex flex-wrap'>
                        {posts && posts.map((post)=>(
                            <div key={post.$id} className="w-1/4 p-2">
                                <PostCard post={post}/>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }    
}

export default Home