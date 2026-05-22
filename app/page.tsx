import { Header } from "@/components/wedding/header"
import { HeroSection } from "@/components/wedding/hero-section"
import { TemplatesSection } from "@/components/wedding/templates-section"
import { CustomizeSection } from "@/components/wedding/customize-section"
import { FeaturesSection } from "@/components/wedding/features-section"
import { Footer } from "@/components/wedding/footer"
import { fetchTemplates } from "@/app/actions/templates"
import type { TemplateData } from "@/components/wedding/template-card"

export const revalidate = 60

export default async function Home() {
  const rows = await fetchTemplates()
  const templates: TemplateData[] = rows.map((t) => ({
    id: t.id,
    name: t.name,
    style: t.style,
    primaryColor: t.primary_color,
    secondaryColor: t.secondary_color,
    accentColor: t.accent_color,
    bgPattern: t.bg_pattern,
  }))

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TemplatesSection templates={templates} />
      <CustomizeSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <Footer />
    </main>
  )
}
