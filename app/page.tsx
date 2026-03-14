"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { StatsSection } from "@/components/stats-section"
import { AboutSection } from "@/components/about-section"
import { VideosSection } from "@/components/videos-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { useTranslation } from "@/lib/i18n"

export default function Home() {
  const { t } = useTranslation()

  // Right-click protection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }
    document.addEventListener("contextmenu", handleContextMenu)
    return () => document.removeEventListener("contextmenu", handleContextMenu)
  }, [])

  return (
    <main className="min-h-screen select-none" dir={t.dir} lang={t.lang}>
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProjectsSection />
      <VideosSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
