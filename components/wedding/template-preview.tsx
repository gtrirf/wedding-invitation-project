"use client"

import { X, Heart, MapPin, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TemplateData } from "./template-card"

interface TemplatePreviewProps {
  template: TemplateData
  onClose: () => void
  onSelect: () => void
}

export function TemplatePreview({ template, onClose, onSelect }: TemplatePreviewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-lg shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Full Invitation Preview */}
        <div 
          className="p-8 md:p-12"
          style={{ backgroundColor: template.secondaryColor }}
        >
          <div className="text-center">
            {/* Top Border */}
            <div 
              className="w-24 h-px mx-auto mb-8"
              style={{ backgroundColor: template.accentColor }}
            />

            <p 
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: template.primaryColor }}
            >
              Together with their families
            </p>

            <h2 
              className="font-serif text-5xl md:text-6xl mb-2"
              style={{ color: template.primaryColor }}
            >
              Sarah
            </h2>
            
            <div 
              className="w-12 h-12 mx-auto my-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${template.accentColor}20` }}
            >
              <Heart 
                className="w-5 h-5" 
                style={{ color: template.accentColor }}
              />
            </div>
            
            <h2 
              className="font-serif text-5xl md:text-6xl mb-6"
              style={{ color: template.primaryColor }}
            >
              James
            </h2>

            <p 
              className="text-sm uppercase tracking-[0.2em] mb-8"
              style={{ color: template.primaryColor, opacity: 0.8 }}
            >
              Request the pleasure of your company at their wedding celebration
            </p>

            {/* Event Details */}
            <div 
              className="border-y py-8 my-8 space-y-6"
              style={{ borderColor: `${template.accentColor}40` }}
            >
              <div className="flex items-center justify-center gap-3">
                <Calendar className="w-4 h-4" style={{ color: template.accentColor }} />
                <span style={{ color: template.primaryColor }}>Saturday, June 15th, 2026</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-4 h-4" style={{ color: template.accentColor }} />
                <span style={{ color: template.primaryColor }}>Ceremony at 4:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-4 h-4" style={{ color: template.accentColor }} />
                <span style={{ color: template.primaryColor }}>The Grand Garden Estate, New York</span>
              </div>
            </div>

            {/* RSVP Section */}
            <div className="mb-8">
              <p 
                className="text-sm mb-4"
                style={{ color: template.primaryColor, opacity: 0.8 }}
              >
                Please respond by May 15th, 2026
              </p>
              <button
                className="px-8 py-3 rounded text-sm uppercase tracking-wider transition-opacity hover:opacity-90"
                style={{ 
                  backgroundColor: template.primaryColor,
                  color: template.secondaryColor
                }}
              >
                RSVP Now
              </button>
            </div>

            {/* Bottom Border */}
            <div 
              className="w-24 h-px mx-auto"
              style={{ backgroundColor: template.accentColor }}
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="sticky bottom-0 p-4 bg-white border-t flex items-center justify-between">
          <div>
            <p className="font-serif text-lg text-foreground">{template.name}</p>
            <p className="text-sm text-muted-foreground">{template.style}</p>
          </div>
          <Button onClick={onSelect} className="bg-primary text-primary-foreground">
            Use This Template
          </Button>
        </div>
      </div>
    </div>
  )
}
