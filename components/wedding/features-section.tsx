"use client"

import { Check, Sparkles, Users, Palette, Share2, Mail, Clock } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Beautiful Templates",
    description: "Choose from a variety of elegant, professionally designed templates for every wedding style."
  },
  {
    icon: Sparkles,
    title: "Easy Customization",
    description: "Personalize every detail - colors, fonts, text, and images - with our intuitive editor."
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    description: "Share your invitation via link, email, or social media with just one click."
  },
  {
    icon: Users,
    title: "RSVP Tracking",
    description: "Collect and manage guest responses in one place with our built-in RSVP system."
  },
  {
    icon: Mail,
    title: "Digital Delivery",
    description: "Save on printing costs and deliver your invitations instantly to guests anywhere."
  },
  {
    icon: Clock,
    title: "Countdown Timer",
    description: "Build excitement with a beautiful countdown timer to your special day."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Why Choose Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Create stunning wedding invitations in minutes with our powerful yet simple tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Teaser */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="bg-card rounded-lg p-8 border text-center">
            <h3 className="font-serif text-2xl text-foreground mb-4">Start Creating for Free</h3>
            <p className="text-muted-foreground mb-6">
              Create and preview your invitation at no cost. Only pay when you are ready to share.
            </p>
            <ul className="inline-flex flex-col items-start gap-3 mb-6 text-sm">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-foreground">Unlimited template previews</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-foreground">Full customization access</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-foreground">RSVP tracking included</span>
              </li>
            </ul>
            <p className="text-2xl font-serif text-foreground">
              <span className="line-through text-muted-foreground text-lg mr-2">$29</span>
              $19
              <span className="text-sm text-muted-foreground font-sans ml-1">one-time</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
