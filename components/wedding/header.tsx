"use client"

import { Heart } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent fill-accent/20" />
            <span className="font-serif text-xl text-foreground">Forever Yours</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="#templates" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Templates
            </Link>
            <Link 
              href="#customize" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Customize
            </Link>
            <Link 
              href="#features" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
          </nav>

          {/* CTA */}
          <Link 
            href="#templates"
            className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
