import montserrat from "./presets/montserrat.json"
import inter from "./presets/inter.json"
import playfairDisplay from "./presets/playfair-display.json"
import sourceSerif4 from "./presets/source-serif-4.json"
import spaceGrotesk from "./presets/space-grotesk.json"
import ebGaramond from "./presets/eb-garamond.json"
import jetbrainsMono from "./presets/jetbrains-mono.json"

export interface FontPreset {
  id: string
  label: string
  family: string
  fontSans: string
  fontHeading: string
}

export const defaultFontId = "montserrat"

export const fonts: FontPreset[] = [
  montserrat as FontPreset,
  inter as FontPreset,
  playfairDisplay as FontPreset,
  sourceSerif4 as FontPreset,
  spaceGrotesk as FontPreset,
  ebGaramond as FontPreset,
  jetbrainsMono as FontPreset,
]

export function getFont(id: string): FontPreset | undefined {
  return fonts.find((f) => f.id === id)
}

export function groupByFamily(): Record<string, FontPreset[]> {
  const groups: Record<string, FontPreset[]> = {}
  for (const font of fonts) {
    if (!groups[font.family]) {
      groups[font.family] = []
    }
    groups[font.family].push(font)
  }
  return groups
}
