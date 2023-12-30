import React,{useCallback, useEffect} from 'react'
import {useForm} from "react-hook-form"
import {Input,Button,Logo,RTE,Select} from "../index"
import databaseservice from '../../appwrite/configuration'
import { useSelector } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'

function PostForm({post}) {
    // console.log(name)
    // console.log(post)
    const navigate=useNavigate()
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({defaultValues:{
        title:post?.title ||'', 
        slug:post?.slug ||'',
        content:post?.content ||'',
        status:post?.status || 'active'
    },})
    const userData=useSelector((state)=>state.auth.userData)
    const submit =async (data)=>{
        // console.log(data,2)
        if(post){
            // console.log("post is available")
            const file=data.image[0]?databaseservice.uploadFile(data.image[0]):null
            // console.log(file)
            if(file){
                databaseservice.deleteFile(post.featuredImage)
            }
            const dbPost=await databaseservice.updatePost(post.$id,{...data,
            featuredImage:file?file.$id:undefined})
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
               
        }
        else{
            // console.log('data in else')
            const file=await databaseservice.uploadFile(data.image[0])
            if(file){
                // console.log(file.$id)
                const fileId=file.$id
                data.featuredImage=fileId   
                const dbPost=await databaseservice.createPost({
                    ...data,userId:userData.$id
                })
                if(dbPost){
                    // navigate(`/post/${dbPost.$id}`)
                    navigate('/')
                }
            }
        }
    } 
    const slugTransform=useCallback((value)=>{
        if(value && typeof value ==='string'){ 
            // console.log(value)
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d]+/g, "-")
            // .replace(/\s/g, "-");
        }
        return ''
    },[])
    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })
    },[watch,slugTransform,setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap my-10">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        {/* {console.log(post)} */}
                        <img
                            src={databaseservice.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}
export default PostForm 