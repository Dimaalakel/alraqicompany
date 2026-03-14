"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { ar } from "./ar"
import { en } from "./en"

type Translations = typeof ar
type Language = "ar" | "en"

// Helper function to get nested value by dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return path // Return the path itself if not found
  }, obj)
}

type TranslationFunction = {
  (key: string): unknown
} & Translations

interface I18nContextType {
  lang: Language
  locale: Language
  t: TranslationFunction
  setLang: (lang: Language) => void
  toggleLang: () => void
}

const I18nContext = createContext<I18nContextType | null>(null)

const translations: Record<Language, Translations> = { ar, en }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar")

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null
    if (saved && (saved === "ar" || saved === "en")) {
      setLangState(saved)
      document.documentElement.dir = translations[saved].dir
      document.documentElement.lang = saved
    }
  }, [])

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem("lang", newLang)
    document.documentElement.dir = translations[newLang].dir
    document.documentElement.lang = newLang
  }, [])

  const toggleLang = useCallback(() => {
    const newLang = lang === "ar" ? "en" : "ar"
    setLang(newLang)
  }, [lang, setLang])

  // Create a function that also has all translation properties
  const currentTranslations = translations[lang]
  const tFunction = ((key: string) => getNestedValue(currentTranslations as unknown as Record<string, unknown>, key)) as TranslationFunction
  
  // Copy all properties from translations to the function
  Object.assign(tFunction, currentTranslations)

  return (
    <I18nContext.Provider value={{ lang, locale: lang, t: tFunction, setLang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useTranslation must be used within LanguageProvider")
  return context
}
