"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
  { label: "Pricing", href: "/subscriptions" },
]

const Navbar = () => {
  const pathName = usePathname()

  return (
    <header className="w-full fixed z-50 bg-background/80 backdrop-blur-md border-b border-(--border-subtle)">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex gap-0.5 items-center">
          <Image src="/assets/logo.png" alt="Bookfied" width={42} height={26} />
          <span className="logo-text">Bookfied</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href ||
              (href !== "/" && pathName.startsWith(href))

            return (
              <Link
                href={href}
                key={label}
                className={cn(
                  "nav-link-base",
                  isActive
                    ? "nav-link-active"
                    : "text-black hover:opacity-70"
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="pt-10">
              <div className="flex flex-col gap-6">
                {navItems.map(({ label, href }) => {
                  const isActive =
                    pathName === href ||
                    (href !== "/" && pathName.startsWith(href))

                  return (
                    <Link
                      key={label}
                      href={href}
                      className={cn(
                        "text-lg font-medium transition-colors pl-5",
                        isActive
                          ? "text-(--color-brand)"
                          : "text-foreground hover:text-(--color-brand)"
                      )}
                    >
                      {label}
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar