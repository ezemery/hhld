import { config } from "../config";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { useData } from "../layout";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthQuery } from "../lib/utils/fetchRequests";

interface EmailData {
  email: string;
}

interface PaswwordData {
  password: string;
}

const login = () => {
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const {
    isLoading: loginLoading,
    data: loginData,
    error: loginError,
    refetch: loginRefetch,
    isSuccess: loginIsSuccess,
  } = useQuery({
    queryKey: ["data", email, password, "login"],
    queryFn: fetchAuthQuery,
    enabled: false,
  });

  const {
    isLoading: signUpLoading,
    data: signUpData,
    error: signUpError,
    refetch: signUpRefetch,
    isSuccess: signUpIsSuccess,
  } = useQuery({
    queryKey: ["data", email, password, "signup"],
    queryFn: fetchAuthQuery,
    enabled: false,
  });
  const { setUser } = useData();
  const router = useRouter();

  const emialChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setEmailState(e.currentTarget?.value);
  };

  const passwordChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setPasswordState(e.currentTarget?.value);
  };

  const loginHandler = () => {
    loginRefetch();
  };
  const signUpHandler = () => {
    signUpRefetch();
  };

  if (loginIsSuccess) {
    setUser(loginData);
    router.push("/chat");
  }

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
            {(signUpError || loginError) && <div>There was an error {JSON.stringify(signUpError) || JSON.stringify(loginError)}</div>}
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

export default login;
