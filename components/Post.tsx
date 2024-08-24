"use client";
import React from "react";
import ReactTimeago from "react-timeago"; // Ensure this import is correct
import { Profilephoto } from "./shared/Profilephoto";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { IPostDocument } from "@/models/Post.model";
import PostContent from "./PostContent";

export const Post = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const fullName = `${post?.user?.firstName || "Unknown"} ${post?.user?.lastName || "User"}`;
  const loggedInUser = user?.id === post?.user?.userId;

  return (
    <div className="bg-white my-2 rounded-lg border border-gray-300">
      <div className="flex gap-2 p-4">
        <Profilephoto src={post?.user?.profilePhoto || "/default-profile.png"} />
        <div className="flex items-center justify-center w-full flex-col">
          <h1 className="text-sm font-bold">
            {fullName}{" "}
            {loggedInUser && (
              <Badge variant={"secondary"} className="ml-2">
                You
              </Badge>
            )}
          </h1>
          <p className="text-xs text-gray-500">
            @{user?.username || "username"}
          </p>

          <p className="text-xs text-gray-500">
            <ReactTimeago date={new Date(post.createdAt)} />
          </p>
        </div>
        <div>
          <Button size={"icon"} className="rounded-full" variant={"outline"}>
            <Trash2 />
          </Button>
        </div>
      </div>
      <PostContent post={post} />
    </div>
  );
};
