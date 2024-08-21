import React from 'react'
import { Postinput } from './Postinput'
import { Posts } from './Posts'

export default function Feed({user}:{user:any}) {
  const userData = JSON.parse(JSON.stringify(user));
  // console.log(userData);
  return (
    <div className='flex-1 '>
       <Postinput user = {userData}/>
       <Posts/>
    </div>
  )
}

