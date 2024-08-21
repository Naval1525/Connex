import Image from "next/image";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

export const Profilephoto = ({ src }: { src: String }) => {
  return (
    <div className="cursor-pointer">
      <Avatar className="w-14 h-14">
        <AvatarImage src={src} alt="@shadcn" />
      </Avatar>
    </div>
  );
};