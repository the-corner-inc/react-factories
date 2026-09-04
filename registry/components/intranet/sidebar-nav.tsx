"use client"

/**
 * Data-driven intranet sidebar nav.
 *
 * PURE PRESENTATION: it receives `items` already filtered (RBAC + locale),
 * plus the signed-in `user`, the app `version`, and an `onLogout` handler. It
 * performs no data fetching and no RBAC checks — the caller owns those.
 *
 * Icons are resolved from a string key -> lucide component registry so the
 * menu data stays serialisable/locale-safe.
 */

import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  FileTextIcon,
  FolderKanbanIcon,
  GoalIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  NetworkIcon,
  ReceiptIcon,
  SettingsIcon,
  TrendingUpIcon,
  UserRoundIcon,
  UsersIcon,
} from "lucide-react";
import * as React from "react";

import { Link } from "#/components/ui/link";
import { usePathname } from "#/components/ui/use-location";
import {
  collectMenuItemPaths,
  type MenuCollapsibleItem,
  type MenuItem,
} from "#/lib/intranet/menu-item";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "#/components/intranet/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { cn } from "#/lib/utils";

export interface AppSidebarUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface SidebarNavProps {
  /** Menu structure, already RBAC-filtered and locale-resolved. */
  items: MenuItem[];
  /** Signed-in user, used for the footer avatar/identity card. */
  user?: AppSidebarUser | null;
  /** Application version, rendered at the bottom of the sidebar. */
  version?: string;
  /** Sign-out handler (the caller owns the auth/RBAC side). */
  onLogout?: () => void | Promise<void>;
  /** Optional brand label rendered in the sidebar header. */
  title?: string;
}

const MENU_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboardIcon,
  home: HomeIcon,
  settings: SettingsIcon,
  users: UsersIcon,
  user: UserRoundIcon,
  file: FileTextIcon,
  folder: FolderKanbanIcon,
  goal: GoalIcon,
  network: NetworkIcon,
  invoice: ReceiptIcon,
  trending: TrendingUpIcon,
  "log-out": LogOutIcon,
  default: FolderKanbanIcon,
};

function MenuItemIcon({ icon }: { icon?: string }) {
  if (!icon) return null;
  const Icon = MENU_ICONS[icon] ?? MENU_ICONS.default;
  return <Icon className="size-4 shrink-0" aria-hidden="true" />;
}

function getInitials(name?: string | null, email?: string | null): string {
  const source = (name ?? email ?? "").trim();
  if (!source) return "U";
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
  return source.slice(0, 2).toUpperCase();
}

function UserAvatar({ user }: { user: AppSidebarUser }) {
  if (user.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- external user avatar
      <img src={user.image} alt={user.name ?? "User"} className="size-8 shrink-0 rounded-full" />
    );
  }
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
      {getInitials(user.name, user.email)}
    </span>
  );
}

function isPathActive(
  pathname: string,
  to: string,
  match: "exact" | "prefix" = "prefix",
): boolean {
  if (to === "/") {
    return match === "exact" ? pathname === "/" : pathname === "/" || pathname.startsWith("/");
  }
  if (match === "exact") return pathname === to;
  return pathname === to || pathname.startsWith(to.endsWith("/") ? to : `${to}/`);
}

function SidebarLinkItem({ item, pathname }: { item: MenuItem; pathname: string }) {
  if (item.type !== "link") return null;
  const active = isPathActive(pathname, item.to, item.match);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={active}
        render={<Link href={item.to} />}
        className="gap-2"
      >
        <MenuItemIcon icon={item.icon} />
        <span className="flex-1 text-left">{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function CollapsibleItem({ item, pathname }: { item: MenuCollapsibleItem; pathname: string }) {
  const childPaths = collectMenuItemPaths(item.children);
  const anyChildActive = childPaths.some((to) => isPathActive(pathname, to, "prefix"));
  const defaultActive = (item.defaultOpenPaths ?? []).some((to) =>
    isPathActive(pathname, to, "prefix"),
  );
  const [open, setOpen] = React.useState(defaultActive || anyChildActive);

  React.useEffect(() => {
    if (defaultActive || anyChildActive) setOpen(true);
  }, [defaultActive, anyChildActive]);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        type="button"
        isActive={anyChildActive}
        onClick={() => setOpen((prev) => !prev)}
        className="gap-2"
        aria-expanded={open}
      >
        <MenuItemIcon icon={item.icon} />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 transition-transform",
            open ? "rotate-180" : "text-sidebar-foreground/60",
          )}
          aria-hidden="true"
        />
      </SidebarMenuButton>
      {open && (
        <SidebarMenuSub>
          {item.children.map((child, index) => (
            <MenuSubTree key={index} item={child} pathname={pathname} />
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

function MenuSubTree({ item, pathname }: { item: MenuItem; pathname: string }) {
  switch (item.type) {
    case "link": {
      const active = isPathActive(pathname, item.to, item.match);
      return (
        <SidebarMenuSubItem>
          <SidebarMenuSubButton
            isActive={active}
            render={<Link href={item.to} />}
          >
            {item.label}
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      );
    }
    case "collapsible":
      return <CollapsibleItem item={item} pathname={pathname} />;
    case "group":
      return (
        <SidebarMenuSubItem>
          {item.label ? (
            <span className="block px-2 py-1 text-xs font-medium tracking-wide text-sidebar-foreground/70 uppercase">
              {item.label}
            </span>
          ) : null}
        </SidebarMenuSubItem>
      );
    case "separator":
      return (
        <SidebarMenuSubItem aria-hidden>
          <div className="mx-1 my-1 h-px bg-sidebar-border" />
        </SidebarMenuSubItem>
      );
  }
}

/** A separator rendered as a valid `li` child of a `SidebarMenu`/`SidebarMenuSub`. */
function MenuDivider() {
  return (
    <li
      role="separator"
      aria-orientation="horizontal"
      className="mx-2 my-1 h-px bg-sidebar-border"
    />
  );
}

/** Renders a flat list of menu children inside a `<SidebarMenu>` (valid `li` children). */
function renderMenuItems(items: MenuItem[], pathname: string): React.ReactNode {
  return items.map((item, index) => {
    switch (item.type) {
      case "link":
        return <SidebarLinkItem key={index} item={item} pathname={pathname} />;
      case "collapsible":
        return <CollapsibleItem key={index} item={item} pathname={pathname} />;
      case "separator":
        return <MenuDivider key={index} />;
      default:
        return null;
    }
  });
}

function MenuTree({ item, pathname }: { item: MenuItem; pathname: string }) {
  switch (item.type) {
    case "link":
      return <SidebarMenu>{renderMenuItems([item], pathname)}</SidebarMenu>;
    case "collapsible":
      return <SidebarMenu>{renderMenuItems([item], pathname)}</SidebarMenu>;
    case "group":
      return (
        <SidebarGroup>
          {item.label ? <SidebarGroupLabel>{item.label}</SidebarGroupLabel> : null}
          <SidebarMenu>{renderMenuItems(item.items, pathname)}</SidebarMenu>
        </SidebarGroup>
      );
    case "separator":
      return <SidebarSeparator />;
  }
}

export function SidebarNav({ items, user, version, onLogout, title }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      {title ? (
        <SidebarHeader className="h-12 justify-center">
          <span className="px-2 py-1 font-semibold text-sidebar-foreground">{title}</span>
        </SidebarHeader>
      ) : null}

      <SidebarSeparator />

      <SidebarContent>
        {items.map((item, index) => (
          <MenuTree key={index} item={item} pathname={pathname} />
        ))}
      </SidebarContent>

      {version ? (
        <p className="px-2 py-1 text-center text-xs text-sidebar-foreground/40">v{version}</p>
      ) : null}
      <SidebarSeparator />

      {user || onLogout ? (
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-auto w-full items-center gap-2 px-2 py-2 text-left text-sidebar-foreground outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0">
              <UserAvatar user={user ?? {}} />
              <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                <span className="truncate text-sm leading-none font-medium">
                  {user?.name ?? "User"}
                </span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  {user?.email ?? ""}
                </span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 opacity-50" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              {onLogout ? (
                <DropdownMenuItem onClick={onLogout}>
                  <LogOutIcon className="size-4" aria-hidden="true" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      ) : null}
    </Sidebar>
  );
}
