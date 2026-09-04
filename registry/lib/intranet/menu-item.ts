/**
 * Discriminated union describing the intranet sidebar menu.
 * PURE PRESENTATION data — the shell never filters/authorises/resolves items;
 * the caller passes fully-resolved, RBAC+locale-baked `to` paths.
 * Framework-agnostic: no router, no next/*, no data hooks.
 */
export interface MenuLinkItem {
  type: "link"
  label: string
  /** Concrete router path (locale already baked in). */
  to: string
  /** Key into the icon registry owned by the SidebarNav. */
  icon?: string
  /** Active-link matching strategy. Defaults to `"prefix"`. */
  match?: "exact" | "prefix"
}
export interface MenuCollapsibleItem {
  type: "collapsible"
  label: string
  icon?: string
  /** Any of these paths being active forces the group open on mount. */
  defaultOpenPaths?: string[]
  children: MenuItem[]
}
export interface MenuGroupItem { type: "group"; label?: string; items: MenuItem[] }
export interface MenuSeparatorItem { type: "separator" }
export type MenuItem = MenuLinkItem | MenuCollapsibleItem | MenuGroupItem | MenuSeparatorItem

/** Depth-first list of every concrete link path reachable from `items`. */
export function collectMenuItemPaths(items: MenuItem[], acc: string[] = []): string[] {
  for (const item of items) {
    if (item.type === "link") acc.push(item.to)
    else if (item.type === "collapsible") collectMenuItemPaths(item.children, acc)
    else if (item.type === "group") collectMenuItemPaths(item.items, acc)
  }
  return acc
}
