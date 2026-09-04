import * as React from "react"

import type { MenuItem } from "#/lib/intranet/menu-item"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "#/components/intranet/sidebar"
import { SidebarNav, type AppSidebarUser } from "#/components/intranet/sidebar-nav"
import { cn } from "#/lib/utils"

export interface AdminShellProps {
  items: MenuItem[]
  user?: AppSidebarUser | null
  version?: string
  onLogout?: () => void | Promise<void>
  title?: string
  banner?: React.ReactNode
  topbar?: React.ReactNode
  controls?: React.ReactNode
  children?: React.ReactNode
  className?: string
  contentClassName?: string
}

export function AdminShell({
  items,
  user,
  version,
  onLogout,
  title,
  banner,
  topbar,
  controls,
  children,
  className,
  contentClassName,
}: AdminShellProps) {
  return (
    <SidebarProvider>
      <SidebarNav items={items} user={user} version={version} onLogout={onLogout} title={title} />
      <SidebarInset className={cn(className)}>
        {banner ? <div className="border-b px-4 py-2">{banner}</div> : null}
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {topbar ?? (title ? <span className="truncate text-sm font-medium">{title}</span> : null)}
          </div>
          {controls ? <div className="ml-auto flex items-center gap-2">{controls}</div> : null}
        </div>
        <div className={cn("flex-1 overflow-y-auto p-4 sm:p-6", contentClassName)}>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
