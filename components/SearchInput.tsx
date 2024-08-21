import React from 'react';
import { Input } from './ui/input';

export default function SearchInput() {
  return (
    <div className="dark:bg-[#333] dark:text-[#fff]">
      <Input 
        type="email" 
        placeholder="Search" 
        className="bg-[#ffffff] w-80 rounded-lg border-spacing-4 border-black dark:bg-[#444] dark:text-[#7e2525]"
      />
    </div>
  );
}



