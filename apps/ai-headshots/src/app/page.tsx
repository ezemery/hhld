
import Link from "next/link";
import { JSX, SVGProps } from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <CameraIcon className="size-6" />
          <span className="sr-only">AI Headshots</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-24 md:pt-32 lg:pt-40">
          <div className="container px-4 md:px-6 text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Create Headshots with AI
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Our AI-powered headshot generator makes it easy to create
              professional-looking headshots for your business or personal use.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function CameraIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
