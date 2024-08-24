"use client";
import React, { useState } from "react";
import ReactTimeago from "react-timeago";
import { Profilephoto } from "./shared/Profilephoto";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import PostContent from "./PostContent";
import { deletePostAction } from "@/lib/serveractions";
import Socialoptions from "./Socialoptions";

// Assuming `post` is now a plain JavaScript object
export const Post = ({ post }: { post: any }) => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fullName = `${post?.user?.firstName || "Unknown"} ${post?.user?.lastName || "User"}`;
  const loggedInUser = user?.id === post?.user?.userId;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    try {
      await deletePostAction(post._id);
      closeModal(); // Close modal after successful deletion
    } catch (error) {
      console.error("Failed to delete post:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300">
      <div className="flex gap-2 p-4">
        <Profilephoto
          src={post?.user?.profilePhoto || "/default-profile.png"}
        />
        <div className="flex items-center justify-between w-full">
          <div>
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
            {loggedInUser && (
              <Button
                onClick={openModal}
                size={"icon"}
                className="rounded-full"
                variant={"outline"}
                aria-label="Delete post" // Accessibility improvement
              >
                <Trash2 />
              </Button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={closeModal}
                aria-label="Cancel delete"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDelete}
                aria-label="Confirm delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <PostContent post={post} />
      <Socialoptions post={post} />
    </div>
  );
};
