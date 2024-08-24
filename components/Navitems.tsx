import { Bell, BriefcaseBusiness, Home, MessageCircleMore, Users } from 'lucide-react'
import Link from 'next/link';
import React from 'react';

interface NAVITEMS {
    src:string,
    icon:JSX.Element,
    text:string
}

const navItems:NAVITEMS[] = [
    {
        src: "/home",
        icon: <Home />,
        text: "Home",
    },
    {
        src: "/networks",
        icon: <Users />,
        text: "My Network",
    },
   
    {
        src: "/message",
        icon: <MessageCircleMore />,
        text: "Messaging",
    },
    {
        src: "/notification",
        icon: <Bell />,
        text: "Notification",
    },
]

const NavItems = () => {
  return (

    <div className='flex gap-8'>
        {
            navItems.map((navItem, index)=>{
                return (
                    <div key={index} className='flex flex-col items-center cursor-pointer text-white hover:text-red-300'>
                        <span >{navItem.icon}</span>
                        <Link className='text-xs' href={navItem.src}>{navItem.text}</Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default NavItems
