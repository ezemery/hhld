import Link from "next/link"
import { CameraIcon } from "./logo"

export const Header = () => {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link
          href="/"
          className="flex items-center gap-2"
          prefetch={false}
        >
          <CameraIcon className="size-6" />
          <span className="font-bold">Headshots Inc</span>
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
    )
}