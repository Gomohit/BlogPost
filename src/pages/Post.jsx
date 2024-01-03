import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseservice from "../appwrite/configuration";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading,setLoading]=useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const userStatus=useSelector((state)=>state.auth.status)
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    console.log(userStatus)
    useEffect(() => {
        setLoading(true)
        if (slug && userStatus) {
            databaseservice.getPost(slug).then((post) => {
                if (post) {
                    setLoading(false)
                    setPost(post);
                }
                else navigate("/");
            });
        } 
        else navigate("/");
    }, [slug, navigate,userStatus]);
    const deletePost = () => {
        databaseservice.deletePost(post.$id).then((status) => {
            if (status) {
                databaseservice.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    if(loading){
        return(
            <div className="flex flex-col items-center justify-center spinner-container my-52">
                <div className="border-t-2 border-blue-500 border-solid h-10 w-10 rounded-full animate-spin"></div>
                <p className='text-center font-sans font-normal text-base mt-1'>loading...</p>
            </div>
        )
    }
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={databaseservice.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ):null;
}