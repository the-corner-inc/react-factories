"use client"

import * as React from "react"
import {
  type FontPreset,
  fonts as allFonts,
  defaultFontId,
  getFont,
  groupByFamily,
} from "@/lib/fonts"

interface FontContextValue {
  font: FontPreset
  fontId: string
  setFont: (id: string) => void
  isLocked: boolean
  allFonts: FontPreset[]
  groupedFonts: Record<string, FontPreset[]>
}

const FontContext = React.createContext<FontContextValue | null>(null)

export interface FontProviderProps {
  children: React.ReactNode
  defaultFont?: string
  locked?: boolean
  storageKey?: string
}

export function FontProvider({
  children,
  defaultFont = defaultFontId,
  locked = false,
  storageKey = "font-preset",
}: FontProviderProps) {
  const [fontId, setFontId] = React.useState(defaultFont)

  React.useEffect(() => {
    if (locked) return
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved && getFont(saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from localStorage on mount
        setFontId(saved)
      }
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [locked, storageKey])

  React.useEffect(() => {
    const font = getFont(fontId) ?? getFont(defaultFont)
    if (!font) return

    const id = "font-preset-style"
    const existing = document.getElementById(id)
    if (existing) existing.remove()

    const style = document.createElement("style")
    style.id = id
    style.textContent = [
      `body,.font-sans{font-family:${font.fontSans}!important}`,
      `.font-heading,h1,h2,h3,h4,h5,h6{font-family:${font.fontHeading}!important}`,
    ].join("")
    document.head.appendChild(style)

    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [fontId, defaultFont])

  const setFont = React.useCallback(
    (id: string) => {
      if (locked) return
      if (!getFont(id)) return
      setFontId(id)
      try {
        localStorage.setItem(storageKey, id)
      } catch {
        // ignore storage errors
      }
    },
    [locked, storageKey],
  )

  const font = getFont(fontId) ?? getFont(defaultFont) ?? allFonts[0]
  const value = React.useMemo<FontContextValue>(
    () => ({
      font,
      fontId: font.id,
      setFont,
      isLocked: locked,
      allFonts,
      groupedFonts: groupByFamily(),
    }),
    [font, setFont, locked],
  )

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>
}

export function useFont(): FontContextValue {
  const ctx = React.useContext(FontContext)
  if (!ctx) {
    throw new Error("useFont must be used within a FontProvider")
  }
  return ctx
}
