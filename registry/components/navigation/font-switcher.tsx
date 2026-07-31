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
import { type FontRole } from "@/lib/fonts"
import { useFont } from "@/components/ui/font-provider"

export interface FontSwitcherProps {
  label?: string
  ariaLabel?: string
  className?: string
}

const ROLE_LABELS: Record<FontRole, string> = {
  heading: "Titres",
  body: "Texte",
  mono: "Mono",
}

export function FontSwitcher({
  label,
  ariaLabel = "Font",
  className,
}: FontSwitcherProps) {
  const { isLocked, config, setRoleFont, allFonts } = useFont()

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
      <DropdownMenuContent align="end" className="w-56">
        {(Object.keys(ROLE_LABELS) as FontRole[]).map((role) => (
          <DropdownMenuSub key={role}>
            <DropdownMenuSubTrigger className="justify-between">
              {ROLE_LABELS[role]}
              <span className="text-xs font-normal text-muted-foreground">
                {allFonts.find((f) => f.id === config[role])?.label ?? ""}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-44">
              {allFonts.map((font) => (
                <DropdownMenuItem
                  key={font.id}
                  className="justify-between"
                  onClick={() => setRoleFont(role, font.id)}
                >
                  <span style={{ fontFamily: font.cssVar }}>{font.label}</span>
                  {font.id === config[role] && (
                    <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
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
