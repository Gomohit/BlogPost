import config from "../config/config";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class databaseService{
    client=new Client()
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteurl) 
        .setProject(config.appwriteProjectId);  
        this.database=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            const post=await this.database.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{
                title,content,featuredImage,status,userId})  
            return post 
        } 
        catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.database.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
            })
        }
        catch(error){
            throw error
        }
    }

    async deletePost(slug){
        try {
            return await this.database.deleteDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
        } catch (error) {
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
        } catch (error) {
            return false
        }
    }

    async getPosts(queries=[Query.equal("status","true")]){
        try {
            return await this.database.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,queries)
        } catch (error) {
            return false
        }
    }       

    async uploadFile(file){
        try {
           return await this.bucket.createFile(config.appwriteBucketId,ID.unique(),file) 
        } catch (error) {
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(config.appwriteBucketId,fileId)
            return true
        } catch (error) {
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(config.appwriteBucketId,fileId)
    }
}
const databaseservice=new databaseService()
export default databaseservice