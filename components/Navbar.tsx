
import React from 'react';
import SearchInput from './SearchInput';
import Navitems from './Navitems';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import Image from 'next/image';

export const Navbar = () => {
  return (
    <div className="fixed w-full bg-black z-50 shadow-md">
      <div className="flex items-center max-w-6xl justify-between h-16 mx-auto px-3">
        <div className='flex items-center gap-6'>
          <Image
            src={'/Group 8.svg'}
            alt="Logo"
            width={35}
            height={35}
           
          />
        <div className='md:block hidden' >
          <SearchInput 
           />
        </div>
        </div>
        <div className='flex items-center gap-7'>
            <div className='md:block hidden'>
                <Navitems/>
            </div>
            <div>
                <SignedIn>
                 <UserButton/>
                </SignedIn>
                <SignedOut>
                <Button className='rounded-full bg-white text-black'>
                    <SignInButton/>
                </Button>
                </SignedOut>
                  
                
            </div>

        </div>
       
      </div>
    </div>
  );
};