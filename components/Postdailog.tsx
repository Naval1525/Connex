import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Profilephoto } from "./shared/Profilephoto";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import {  ImageIcon, Images, ImagesIcon } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import { createPostAction } from "@/lib/serveractions"
export function Postdailog({
  setopen,
  open,
  src,
}: {
  setopen: any;
  open: any;
  src: String;
}) {
    const [inputText, setInputText] = useState<string>("");
  const changehandler=(e:any )=>{
    setInputText(e.target.value);

  }
  const inputRef = useRef<HTMLInputElement>(null);
  const fileChangehandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files?.[0];
      if (file) {
        const dataUrl = await readFileAsDataUrl(file);
        setSelectedFile(dataUrl);
      }
    }
  };
  const postActionHandler = async (formData: FormData) => {
    const inputText = formData.get('inputText') as string;
    try {
        await createPostAction(inputText, selectedFile);
    } catch (error) {
        console.log('error occurred', error);
    }
    setInputText("");
    setopen(false);
}
  const [selectedFile, setSelectedFile] = useState<string>("");
  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px] "
        onInteractOutside={() => setopen(false)}
      >
        <DialogHeader>
          <DialogTitle className="flex gap-3">
            <Profilephoto src={src}></Profilephoto>
            <div>
              <div>
                <p className="text-sm">Post to anyone</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action="">
          <div className="flex flex-col">
            <Textarea
              id="name"
              name="inputText"
              value="input text "
              onChange={changehandler }
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
                accept="image/* "
              ></input>
              <Button type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>
        <Button
          onClick={() => {
            inputRef?.current?.click();
          }}
          className="bg-black hover:bg-black gap-2 "
        >
          <Images></Images>
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
