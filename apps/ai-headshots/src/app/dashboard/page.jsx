"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@repo/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/avatar"
import { Input } from "@repo/ui/input"
import { CameraIcon } from "../components/ui/logo"
import { getCookie } from "../lib/cookie"
import { useLayoutEffect, useState } from "react"
import { signOut } from "next-auth/react";
export default function Dashboard() {
    const [user, setUser] = useState()
    useLayoutEffect(() => {
        setUser(() => JSON.parse(getCookie("ai_headshots_session")))
    },[])

    const signout = () => {
     console.log("Signing out of Google");
     signOut({ callbackUrl: '/login' });
   };
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
             <CameraIcon className="size-6" />
            <span className="font-bold">Headshots Inc</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.image} alt="@shadcn" />
                  <AvatarFallback>{user?.name.split(" ")[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
                <CardDescription>Drag and drop your files here or click to browse.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex h-[400px] items-center justify-center">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted p-8 text-center transition-colors hover:border-primary">
                    <UploadIcon className="h-12 w-12 text-muted-foreground" />
                    <div className="text-lg font-medium">Drag and drop your files here</div>
                    <div className="text-muted-foreground">
                      or{" "}
                      <Button variant="link" className="inline-flex">
                        browse
                      </Button>
                      your computer
                    </div>
                    <Input type="file" className="sr-only" />
                  </div>
                </div>
                {/* <div className="grid gap-4">
                  <div className="text-lg font-medium">Preview</div>
                  <div className="grid grid-cols-3 gap-4">
                    <img
                      src="/placeholder.svg"
                      alt="Preview"
                      width={200}
                      height={200}
                      className="aspect-square w-full rounded-md object-cover"
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Preview"
                      width={200}
                      height={200}
                      className="aspect-square w-full rounded-md object-cover"
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Preview"
                      width={200}
                      height={200}
                      className="aspect-square w-full rounded-md object-cover"
                    />
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}