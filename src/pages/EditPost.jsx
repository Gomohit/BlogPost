import React,{useEffect,useState} from 'react'
import { Container,PostForm } from '../components'
import databaseservice from '../appwrite/configuration'
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {
  const [post,setPost]=useState(null)
  const {slug} =useParams()
//   console.log(slug)
  const navigate=useNavigate()
  useEffect(()=>{
    if(slug){
        // console.log(2)
        databaseservice.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }
            else{
                navigate('/')
            }
        })
    }
  },[slug,navigate])
//   console.log(slug)
  return post ?(
    <div className='py-8'>
        <Container>
            {/* {console.log(post)} */}
            <PostForm post={post}/>
        </Container>
    </div>

   ):null}


export default EditPost