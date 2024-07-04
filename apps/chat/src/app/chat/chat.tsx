"use client";
import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  JSX,
  SVGProps,
  MouseEventHandler,
  useLayoutEffect,
} from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector, useAppDispatch } from "./hooks";
import { setTypingState } from "./store/reducer/typingSlice";
import { setApiMessageState, setMessageState, setWebsocketMessageState } from "./store/reducer/messageSlice";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "../components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Textarea } from "../components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useData } from "../layout";
import { fetchChatQuery, getMsgQuery } from "../lib/utils/fetchRequests";
import { config } from "../config";
import { setActiveChatId } from "./store/reducer/activeChatSlice";

function ChatWindow() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const activeChatId = useAppSelector((state) => state.activeChatId);
  const typing = useAppSelector((state) => state.typing);
  const message = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket>();
  const { user, setUser } = useData();
  const [showErrorPopup, setShowErrorPopup] = useState(false)

  const {error:contactsError, data: contacts } = useQuery({
    queryKey: ["users"],
    queryFn: fetchChatQuery,
    retry:false
  });
  const { error:userError, data, refetch, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: fetchChatQuery,
    enabled: false,
    retry:false
  });
   const { mutate } = useMutation({
    mutationFn: getMsgQuery,
    retry:false
  });


  if(isSuccess){
    setUser(data)
  }

  if(contactsError || userError){
    //setShowErrorPopup(true)
  }

  useLayoutEffect(() => {
    if (!user) {
      refetch()
    }
  }, []);

  useEffect(() => {
    // Establish WebSocket connection
    const newSocket = io(config.CLIENT_CHAT_API_HOST, {
      query: {
        username: user && user.username,
      },
    });
    setSocket(newSocket);
    newSocket.on("chat msg", (msgrecv) => {
      dispatch(
        setWebsocketMessageState(msgrecv),
      );
    });

    // Clean up function
    return () => {
      newSocket.close();
    };
  }, [user]);

  const onClick = async (e: MouseEventHandler<HTMLButtonElement>) => {
    dispatch(setTypingState(inputRef.current?.value || ""));
    const msgToBeSent = {
      message: inputRef.current?.value,
      senderId: user && user.username,
      receiverId: activeChatId,
    };

    if (socket) {
      socket.emit("chat msg", msgToBeSent);
      dispatch(
        setMessageState({
          senderId: user && user.username,
          message: inputRef.current?.value || "",
          receiverId: activeChatId,
        }),
      );
    }
    dispatch(setTypingState(""));
    inputRef.current!.value = "";
  };

  return (
    <div className="flex min-h-screen w-full dark:bg-background dark:text-foreground">
      <div className="hidden border-r bg-muted/40 dark:bg-muted lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 overflow-auto py-2">
          <div className="px-4">
              <h3 className="text-lg font-semibold mb-2">Users</h3>
              <form>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-foreground/60" />
                  <Input
                    type="search"
                    placeholder="Search users"
                    className="w-full bg-background dark:bg-muted shadow-none appearance-none pl-8 dark:text-foreground"
                  />
                </div>
              </form>
            </div>
            <nav className="grid gap-1 px-4">
              {user && contacts &&
                contacts.filter((contact:{ username: string; _id: string }) => contact.username != user.username).map(
                  (contact: { username: string; _id: string }) => (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`justify-start gap-2 cursor-pointer ${contact.username == activeChatId ? `hover:bg-primary bg-primary dark:bg-primary/50` : `bg-muted/40 dark:bg-muted/50`}`}
                      asChild
                      key={contact._id}
                      onClick = {()=> {
                        dispatch(setActiveChatId(contact.username))
                        mutate(["msgs", contact.username , user.username],{onSuccess:(data)=>{
                          dispatch(
                            setApiMessageState({
                              senderId: user.username,
                              message: data,
                              receiverId: contact.username,
                            }),
                          );
                        }})
                      }}
                    >
                      <div className="gap-2">
                        <Avatar className="w-6 h-6 border dark:border-foreground">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>{contact.username.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className={`${contact.username == activeChatId ? `font-semibold hover:text-primary-foreground text-primary-foreground dark:text-primary-foreground`: ``}`}>{contact.username}</span>
                      </div>
                    </Button>
                  ),
                )}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 dark:bg-muted px-6">
        <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full border dark:border-foreground w-8 h-8"
              >
                <MenuIcon className="h-6 w-6 dark:text-foreground" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
            <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 overflow-auto py-2">
          <div className="px-4">
              <h3 className="text-lg font-semibold mb-2">Users</h3>
              <form>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-foreground/60" />
                  <Input
                    type="search"
                    placeholder="Search users"
                    className="w-full bg-background dark:bg-muted shadow-none appearance-none pl-8 dark:text-foreground"
                  />
                </div>
              </form>
            </div>
            <nav className="grid gap-1 px-4">
              {user && contacts &&
                contacts.filter((contact:{ username: string; _id: string }) => contact.username != user.username).map(
                  (contact: { username: string; _id: string }) => (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`justify-start gap-2 cursor-pointer ${contact.username == activeChatId ? `hover:bg-primary bg-primary dark:bg-primary/50` : `bg-muted/40 dark:bg-muted/50`}`}
                      asChild
                      key={contact._id}
                      onClick = {()=>{dispatch(setActiveChatId(contact.username))}}
                    >
                      <div className="gap-2">
                        <Avatar className="w-6 h-6 border dark:border-foreground">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>{contact.username.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className={`${contact.username == activeChatId ? `font-semibold hover:text-primary-foreground text-primary-foreground dark:text-primary-foreground`: ``}`}>{contact.username}</span>
                      </div>
                    </Button>
                  ),
                )}
            </nav>
          </div>
        </div>
            </SheetContent>
          </Sheet>
          <Link href="#" className="lg:hidden" prefetch={false}>
            <Package2Icon className="h-6 w-6 dark:text-foreground" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            {activeChatId ? <div className="font-semibold dark:text-foreground">{activeChatId}</div>: ""}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border dark:border-foreground w-8 h-8"
              >
                <img
                  src="/placeholder.svg"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="dark:bg-muted dark:text-foreground"
            >
              <DropdownMenuLabel className="dark:text-foreground">
                {user && user.username} | My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="dark:hover:bg-muted/50">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 dark:bg-background">
          {!activeChatId ? <div className="flex flex-col flex-1 bg-background dark:bg-muted rounded-lg shadow-lg p-4 items-center justify-center">
            <MessageCircleDashedIcon className="h-12 w-12 text-muted-foreground dark:text-foreground/60" />
            <p className="mt-4 text-muted-foreground dark:text-foreground">Select a user to start a conversation</p>
          </div>:
          <div className="flex flex-col flex-1 bg-background dark:bg-muted rounded-lg shadow-lg p-4">
            <div className="flex-1 overflow-auto">
              <div className="flex flex-col gap-4">
                {user && user.username && activeChatId && message[user.username+"/"+activeChatId] && message[user.username+"/"+activeChatId].map((mes, indx) => {
                  if (mes.senderId != user.username) {
                    return (
                      <div key={indx} className="flex items-start gap-4">
                        <Avatar className="w-8 h-8 border dark:border-foreground">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>{mes.senderId.substring(0,1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1 bg-muted dark:bg-background rounded-lg p-3 max-w-[75%]">
                          <div className="font-bold dark:text-foreground">
                            {mes.senderId}
                          </div>
                          <div className="prose text-muted-foreground dark:text-foreground">
                            <p>{mes.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={indx}
                        className="flex items-start gap-4 justify-end"
                      >
                        <div className="grid gap-1 bg-primary dark:bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
                          <div className="font-bold">{mes.senderId}</div>
                          <div className="prose">
                            <p>{mes.message}</p>
                          </div>
                        </div>
                        <Avatar className="w-8 h-8 border dark:border-foreground">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>{mes.senderId.substring(0,1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Textarea
                ref={inputRef}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-muted dark:border-foreground/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-muted dark:text-foreground"
              />
              <Button
                onClick={onClick}
                className="rounded-lg px-4 py-2 bg-primary dark:bg-primary text-primary-foreground"
              >
                Send
              </Button>
            </div>
          </div>
          }
        </main>
      </div>
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-background dark:bg-muted rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Error</h3>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowErrorPopup(false)}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground dark:text-foreground">{JSON.stringify(contactsError) || JSON.stringify(userError)}</p>
          </div>
        </div>
      )}
    </div>
  );
  // }
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MessageCircleDashedIcon(props) {
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
      <path d="M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1" />
      <path d="M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1" />
      <path d="M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5" />
      <path d="M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1" />
      <path d="M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1" />
      <path d="M3.5 17.5 2 22l4.5-1.5" />
      <path d="M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5" />
      <path d="M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1" />
    </svg>
  )
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function Package2Icon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default ChatWindow;
