import React,{useEffect,useState} from 'react'
import databaseservice from "../appwrite/configuration"
import { Container,PostCard } from '../components'
import { useSelector } from 'react-redux'
function AllPost() {
    const [posts,setposts]=useState([])
    const [loading,setLoading]=useState(false)
    const userData=useSelector((state)=>state.auth.userData)
    useEffect(()=>{
        setLoading(true)
        databaseservice.getPosts([]).then((posts)=>{
            if(posts){
                // console.log(posts.documents)
                setposts(posts.documents)
                setLoading(false)
            }
        })
    },[])
  if(loading){
    return(
        <div className="flex flex-col items-center justify-center spinner-container my-52">
                <div className="border-t-2 border-blue-500 border-solid h-10 w-10 rounded-full animate-spin"></div>
                <p className='text-center font-sans font-normal text-base mt-1'>loading...</p>
            </div>
    )
  }  
  return (
    <Container>
        <div className='flex flex-wrap mt-10 mb-52'>
        {posts.length!==0 ? (posts.map((post)=>(
            <div key={post.$id} className='p-2 w-1/4'>
                <PostCard post={post}/>
            </div>
        ))):
        (
            <div className=' my-6 mx-auto flex items-center justify-center w-[500px] py-8 text-xl text-center border border-slate-400 font-normal shadow-md rounded-md'>No Post added</div>
        )
        }
        </div> 
    </Container>
  )
}

export default AllPost