"use client"

import { Type, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useFont } from "@/components/ui/font-provider"

export interface FontSwitcherProps {
  label?: string
  ariaLabel?: string
  className?: string
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function FontSwitcher({
  label,
  ariaLabel = "Font",
  className,
}: FontSwitcherProps) {
  const { isLocked, fontId, setFont, groupedFonts } = useFont()

  if (isLocked) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium text-foreground/80 outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <Type className="h-4 w-4" aria-hidden="true" />
        {label && <span>{label}</span>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {Object.entries(groupedFonts).map(([family, fonts]) => (
          <DropdownMenuSub key={family}>
            <DropdownMenuSubTrigger>
              {capitalize(family)}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-44">
              {fonts.map((font) => (
                <DropdownMenuItem
                  key={font.id}
                  className="justify-between"
                  onClick={() => setFont(font.id)}
                >
                  <span style={{ fontFamily: font.fontHeading }}>
                    {font.label}
                  </span>
                  {font.id === fontId && (
                    <Check className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
