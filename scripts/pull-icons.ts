import { mkdir } from "node:fs/promises";

const ICONS = ["x", "frown", "meh", "smile"] as const;
const ICONS_DIR = new URL("../src/assets/icons/", import.meta.url);
const COMPONENTS_DIR = new URL("../src/components/icons/", import.meta.url);
const CDN = "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons";

function toPascal(name: string) {
  return name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function toJsxAttr(attr: string) {
  return attr.replace(/([a-z])-([a-z])/g, (_, a, b) => a + b.toUpperCase());
}

function toComponent(name: string, svg: string) {
  const cleaned = svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sclass="[^"]*"/, "")
    .replace(/\swidth="[^"]*"/, "")
    .replace(/\sheight="[^"]*"/, "")
    .replace(/\s+/g, " ")
    .trim();

  const withJsx = cleaned
    .replace(/([\s])([a-z][a-z0-9-]*)="/g, (_, space, attr) => `${space}${toJsxAttr(attr)}="`)
    .replace("<svg ", '<svg className={className} aria-hidden="true" ');

  return `export default function ${toPascal(name)}({ className }) {
  return (
    ${withJsx}
  );
}
`;
}

await mkdir(ICONS_DIR, { recursive: true });
await mkdir(COMPONENTS_DIR, { recursive: true });

for (const name of ICONS) {
  const res = await fetch(`${CDN}/${name}.svg`);
  if (!res.ok) throw new Error(`Failed to fetch ${name}: ${res.status}`);
  const svg = await res.text();
  await Bun.write(new URL(`${name}.svg`, ICONS_DIR), svg);
  await Bun.write(new URL(`${toPascal(name)}.jsx`, COMPONENTS_DIR), toComponent(name, svg));
  console.log(`pulled ${name}`);
}
