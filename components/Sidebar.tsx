import React from "react";
import { Profilephoto } from "./shared/Profilephoto";
import { getAllPosts } from "@/lib/serveractions";

const Sidebar = async({ user }: { user: any }) => {
  const posts = await getAllPosts();
  return (
    <div className="hidden md:block w-[20%] h-fit border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex flex-col items-center relative">
        <div className="w-full h-16">
          {user && (
            <div
              className="w-full h-full rounded-t-lg"
              style={{
                background: "linear-gradient(to bottom, #434343, #000000)",
              }}
            ></div>
          )}
        </div>
        <div className="my-1 absolute top-8 left-1/2 transform -translate-x-1/2">
          <Profilephoto
            src={user ? user?.imageUrl : "/next.svg"}
          ></Profilephoto>
        </div>
        <div className="p-2 mt-8 text-center">
          <h1 className="font-sans font-bold hover:underline cursor-pointer">
            {user ? `${user?.firstName} ${user?.lastName}` : "sign karle bhai"}
          </h1>
          <p className="text-xs">
            @{user ? `${user?.username}` : `username`}
          </p>
        </div>
      </div>
      <div className="text-xs">
        <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
          {/* <p>Post Impression</p>
          <p className="text-blue-500 font-bold">88</p> */}
        </div>
        <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
          <p>Posts</p>
          <p className="text-blue-500 font-bold">{posts.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
