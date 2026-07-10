import type { Metadata } from "next"
import { locales, ogLocales, type Locale } from "@/lib/i18n/config"

interface BuildMetadataOptions {
  locale: Locale
  title: string
  description: string
  path: string
  siteUrl: string
  siteName: string
  ogImage?: string
  noIndex?: boolean
}

export function buildMetadata({
  locale,
  title,
  description,
  path,
  siteUrl,
  siteName,
  ogImage,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const cleanPath = path === "/" ? "" : path
  const canonical = `${siteUrl}/${locale}${cleanPath}`

  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[l] = `${siteUrl}/${l}${cleanPath}`
  }
  languages["x-default"] = `${siteUrl}/${locales[0]}${cleanPath}`

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: ogLocales[locale],
      type: "website",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: siteName }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
