"use client"

import { useState } from "react"
import { TemplateCard, TemplateData } from "./template-card"
import { TemplatePreview } from "./template-preview"

interface TemplatesSectionProps {
  templates: TemplateData[]
}

export function TemplatesSection({ templates }: TemplatesSectionProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<TemplateData | null>(null)

  const handleSelect = (template: TemplateData) => {
    setSelectedTemplate(template)
    // Broadcast to CustomizeSection so it can pre-fill the chosen template.
    window.dispatchEvent(new CustomEvent("wedding:template-selected", { detail: template }))
    document.getElementById('customize')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePreview = (template: TemplateData) => {
    setPreviewTemplate(template)
  }

  return (
    <section id="templates" className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Choose Your Style
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Beautiful Templates
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Each template is carefully crafted to help you create the perfect invitation for your special day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleSelect}
              onPreview={handlePreview}
            />
          ))}
        </div>

        {selectedTemplate && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Selected: <span className="font-serif text-foreground">{selectedTemplate.name}</span>
            </p>
          </div>
        )}
      </div>

      {previewTemplate && (
        <TemplatePreview 
          template={previewTemplate} 
          onClose={() => setPreviewTemplate(null)}
          onSelect={() => {
            handleSelect(previewTemplate)
            setPreviewTemplate(null)
          }}
        />
      )}
    </section>
  )
}
