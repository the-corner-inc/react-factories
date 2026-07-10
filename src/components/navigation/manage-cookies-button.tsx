"use client"

export function ManageCookiesButton({
  label,
  manageEvent = "manage-cookies",
  className,
}: {
  label: string
  manageEvent?: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(manageEvent))}
      className={className}
    >
      {label}
    </button>
  )
}
