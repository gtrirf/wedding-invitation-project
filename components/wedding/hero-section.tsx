"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 border border-primary rounded-full" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-primary rounded-full" />
      </div>
      
      <div className="container px-4 mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
          <Heart className="w-12 h-12 text-accent fill-accent/20" />
        </div>
        
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
          Wedding Invitation Templates
        </p>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground mb-6">
          <span className="block text-balance">Forever Yours</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Create beautiful, personalized wedding invitations that capture the essence of your love story. Choose from our elegant templates and share your special day with style.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
            Browse Templates
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6 text-base border-primary/30 hover:bg-primary/5">
            View Demo
          </Button>
        </div>
        
        <div className="mt-20 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl text-foreground">12+</span>
            <span>Templates</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl text-foreground">5k+</span>
            <span>Happy Couples</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl text-foreground">Free</span>
            <span>to Start</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-primary/30" />
      </div>
    </section>
  )
}
