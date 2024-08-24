import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Import DialogDescription
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";
import { Profilephoto } from "./shared/Profilephoto";
import { createPostAction } from "@/lib/serveractions";

export function Postdailog({
  setopen,
  open,
  src,
}: {
  setopen: any;
  open: any;
  src: String;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");

  const fileChangehandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files?.[0];
      if (file) {
        const dataUrl = await readFileAsDataUrl(file);
        setSelectedFile(dataUrl);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(e.target as HTMLFormElement);
    const inputText = formData.get("inputText") as string;

    try {
      await createPostAction(inputText, selectedFile);
      setopen(false);
      setSelectedFile(""); // Close the dialog after submission
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setopen(false)}
      >
        <DialogHeader>
          <DialogTitle className="flex gap-3">
            <Profilephoto src={src} />
            <div>
              <p className="text-sm">Post to anyone</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            Share your thoughts, ideas, or any content you want with others.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Textarea
              id="name"
              name="inputText"
              className="border-none text-lg focus-visible:ring-1"
              placeholder="Type your message here."
            />
          </div>
          <div className="my-4">
            {selectedFile && (
              <Image
                src={selectedFile}
                alt="preview-image"
                width={400}
                height={400}
              />
            )}
          </div>

          <DialogFooter>
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                onChange={fileChangehandler}
                type="file"
                name="Image"
                className="hidden"
                accept="image/*"
              />
              <Button type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>
        <Button
          onClick={() => {
            inputRef?.current?.click();
          }}
          className="bg-black hover:bg-black gap-2"
        >
          <ImageIcon />
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
