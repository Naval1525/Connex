import React from 'react'


import { getAllPosts } from '@/lib/serveractions';
import { Postinput } from './Postinput';
import Posts from './Posts';


const Feed = async ({user}:{user:any}) => {
    const userData = JSON.parse(JSON.stringify(user));
    const posts = await getAllPosts();
    
  return (
    <div className='flex-1'>
        <Postinput user={userData}/>
        <Posts posts = {posts!}/>
    </div>
  )
}

export default Feed