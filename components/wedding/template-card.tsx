"use client"

import { useState } from "react"
import { Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface TemplateData {
  id: string
  name: string
  style: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  bgPattern: "floral" | "minimal" | "geometric" | "classic"
}

interface TemplateCardProps {
  template: TemplateData
  onSelect: (template: TemplateData) => void
  onPreview: (template: TemplateData) => void
}

export function TemplateCard({ template, onSelect, onPreview }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const getPatternClass = () => {
    switch (template.bgPattern) {
      case "floral":
        return "bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.03)_1px,transparent_1px),radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"
      case "minimal":
        return ""
      case "geometric":
        return "bg-[linear-gradient(45deg,rgba(0,0,0,0.02)_25%,transparent_25%),linear-gradient(-45deg,rgba(0,0,0,0.02)_25%,transparent_25%)] bg-[length:30px_30px]"
      case "classic":
        return "bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,rgba(0,0,0,0.015)_10px,rgba(0,0,0,0.015)_11px)]"
      default:
        return ""
    }
  }

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Template Preview Card */}
      <div 
        className={cn(
          "relative aspect-[3/4] rounded-lg overflow-hidden border border-border/50 transition-all duration-300",
          isHovered && "shadow-xl shadow-primary/5 border-primary/20"
        )}
        style={{ backgroundColor: template.secondaryColor }}
      >
        <div className={cn("absolute inset-0", getPatternClass())} />
        
        {/* Mini Invitation Preview */}
        <div className="absolute inset-4 flex flex-col items-center justify-center text-center p-4">
          {/* Top Ornament */}
          <div 
            className="w-16 h-px mb-4"
            style={{ backgroundColor: template.accentColor }}
          />
          
          <p 
            className="text-[10px] uppercase tracking-[0.2em] mb-2"
            style={{ color: template.primaryColor }}
          >
            Together with their families
          </p>
          
          <h3 
            className="font-serif text-xl mb-1"
            style={{ color: template.primaryColor }}
          >
            Sarah & James
          </h3>
          
          <p 
            className="text-[10px] uppercase tracking-wider mb-3"
            style={{ color: template.primaryColor, opacity: 0.7 }}
          >
            Request the pleasure of your company
          </p>
          
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: `${template.accentColor}20` }}
          >
            <Heart 
              className="w-4 h-4" 
              style={{ color: template.accentColor }}
            />
          </div>
          
          <p 
            className="text-[10px]"
            style={{ color: template.primaryColor, opacity: 0.7 }}
          >
            June 15, 2026
          </p>
          
          {/* Bottom Ornament */}
          <div 
            className="w-16 h-px mt-4"
            style={{ backgroundColor: template.accentColor }}
          />
        </div>
        
        {/* Hover Overlay */}
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundColor: `${template.primaryColor}e6` }}
        >
          <Button 
            size="sm" 
            variant="secondary"
            className="gap-2"
            onClick={() => onPreview(template)}
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button 
            size="sm"
            onClick={() => onSelect(template)}
            className="bg-white text-foreground hover:bg-white/90"
          >
            Use Template
          </Button>
        </div>
      </div>
      
      {/* Template Info */}
      <div className="mt-4">
        <h4 className="font-serif text-lg text-foreground">{template.name}</h4>
        <p className="text-sm text-muted-foreground">{template.style}</p>
      </div>
    </div>
  )
}
