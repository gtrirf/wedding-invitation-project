"use client"

import { Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-16 bg-foreground text-background">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-accent fill-accent/20" />
              <span className="font-serif text-xl">Forever Yours</span>
            </Link>
            <p className="text-background/70 text-sm max-w-xs leading-relaxed">
              Create beautiful, personalized wedding invitations that capture the essence of your love story.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#templates" className="hover:text-background transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="#customize" className="hover:text-background transition-colors">
                  Customize
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-background transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            &copy; {new Date().getFullYear()} Forever Yours. All rights reserved.
          </p>
          <p className="text-sm text-background/50">
            Made with <Heart className="w-3 h-3 inline text-accent fill-accent/50" /> for couples everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
