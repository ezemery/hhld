"use client";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { DataContext } from "../hooks/context";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthQuery } from "../lib/utils/fetch-requests";

const Login = () => {
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
   const {
     mutate: loginMutate,
     isPending: loginLoading,
     data: loginData,
     isSuccess:loginSuccess,
   } = useMutation({
     mutationFn: fetchAuthQuery,
     retry: false,
   });

  const {
    data:signUpData,
    mutate: signUpMutate,
    isPending: signUpLoading,
  } = useMutation({
    mutationFn: fetchAuthQuery,
    retry: false,
  });

  const { setUser } = useContext(DataContext);
  const router = useRouter();

  const emialChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setEmailState(e.currentTarget?.value);
  };

  const passwordChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setPasswordState(e.currentTarget?.value);
  };

  if (loginSuccess) {
    setUser(loginData);
    router.push("/chat");
  }
  const loginHandler = () => {
     loginMutate(["data", email, password, "login"]);
  };
  const signUpHandler = () => {
    signUpMutate(["data", email, password, "signup"]);
  };


  return (
    <div className="grid md:grid-cols-2 items-center h-screen bg-muted">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={600}
          height={800}
          alt="Login image"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            {(signUpData || loginData) && (
              <div>
                {JSON.stringify(signUpData) || JSON.stringify(loginData)}
              </div>
            )}
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Enter your username and password to access your account. Or create
              a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={emialChangeHandler}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                  prefetch={false}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={passwordChangeHandler}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                onClick={loginHandler}
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  <>Sign In</>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={signUpHandler}
                disabled={signUpLoading}
              >
                {signUpLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  <>Sign Up</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
