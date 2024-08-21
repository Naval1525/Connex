"use server"

import { Post } from "@/models/Post.mode";
import { IUser } from "@/models/User.model";
import { currentUser } from "@clerk/nextjs/server"

export const createPostAction=async(inputText:String,selecteedfile:String)=>{
      const user = await currentUser();
      if(!user)throw new Error("User not logged in");
      if(!inputText)throw new Error("Input field is required");
      const image = selecteedfile;
      const userDatabase: IUser = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userId: user.id,
        profilePhoto: user.imageUrl
    }
      try{
        if(image){
            await Post.create({
                text: inputText,
                image: image,
                user: userDatabase, //yha per cloudnary pe upload then link milegi
            })


        }


      }catch(e){
        throw new Error("Error creating post");
    }



}