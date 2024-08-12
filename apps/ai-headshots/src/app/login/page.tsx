import Link from "next/link";
import { Button } from "../components/ui/button";
import { JSX, SVGProps } from "react";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Or{" "}
              <Link
                href="#"
                className="font-medium text-primary hover:text-primary/80"
                prefetch={false}
              >
                start your 14-day free trial
              </Link>
            </p>
          </div>
          <Button className="w-full">
            <ChromeIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link
              href="#"
              className="font-medium text-primary hover:text-primary/80"
              prefetch={false}
            >
              Terms of Service
            </Link>
            and{" "}
            <Link
              href="#"
              className="font-medium text-primary hover:text-primary/80"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
