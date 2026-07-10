import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const source = JSON.parse(
  readFileSync(join(root, "registry", "registry.json"), "utf8")
)

const output = {
  ...source,
  items: source.items.map((item) => ({
    ...item,
    files: item.files.map((file) => {
      const content = readFileSync(join(root, file.path), "utf8")
      const target = (file.path.startsWith("registry/"))
        ? file.path.replace("registry/", "src/")
        : file.path
      return { ...file, content, target }
    }),
  })),
}

const outDir = join(root, "public", "registry")
mkdirSync(outDir, { recursive: true })
writeFileSync(join(outDir, "registry.json"), JSON.stringify(output, null, 2))
console.log(
  `Built registry with ${output.items.length} items → public/registry/registry.json`
)
