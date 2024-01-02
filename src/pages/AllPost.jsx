import React,{useEffect,useState} from 'react'
import databaseservice from "../appwrite/configuration"
import { Container,PostCard } from '../components'
function AllPost() {
    const [posts,setposts]=useState([])
    useEffect(()=>{
        databaseservice.getPosts([]).then((posts)=>{
            if(posts){
                setposts(posts.documents)
            }
        })
    },[])
    
  return (
    <Container>
        <div className='flex flex-wrap mt-12 mb-52'>
        {posts && posts.map((post)=>(
            <div key={post.$id} className='p-2 w-1/4'>
                <PostCard post={post}/>
            </div>
        ))}
        </div> 
    </Container>
  )
}

export default AllPost