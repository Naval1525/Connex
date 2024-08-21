'use client';
import React, { useState } from "react";
import { Profilephoto } from "./shared/Profilephoto";
import { Input } from "./ui/input";
import { Postdailog } from "./Postdailog";

export const Postinput = ({ user }: { user: any }) => {
    const [open , setopen]=useState(false);
    const inputhandler=()=>{
        setopen(true);
    }
  return (
    <div className="bg-white p-4 m-2 md:m-0 border-gray-300 rounded-lg">
      <div className="flex items-center gap-3">
        <Profilephoto src={user ? user?.imageUrl : "/next.svg"} />
        <Input
        type="text"
        placeholder="Start a post"
        className="rounded-full hover:bg-gray-100 h-12 cursor-pointer"
        onClick={inputhandler}
        ></Input>
        <Postdailog setopen={setopen} open={open} src={user?.imageUrl}>

        </Postdailog>
      </div>
    </div>
  );
};
