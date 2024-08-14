"use client"
import Link from "next/link";
import { CameraIcon } from "./components/ui/logo";
import { Header } from "./components/ui/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header/>
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

