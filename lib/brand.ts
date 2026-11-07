export const brand = {
  name: "GOTHAM",
  mark: "Gotham",
  tagline: "Privacy is power.",
  line: "Financial privacy for Elysium. Built around shielding assets and transferring value with greater confidentiality.",
  narrative: "Even in paradise, some things are meant to remain unseen.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://trygotham.tech",
} as const;

export const navItems = [
  { href: "/#experience", label: "Demonstration" },
  { href: "/docs", label: "Docs" },
  { href: "/app", label: "App" },
] as const;

export const depths = [
  { id: "surface", label: "Gotham" },
  { id: "problem", label: "Privacy" },
  { id: "works", label: "How it works" },
  { id: "experience", label: "Demonstration" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "roadmap", label: "Roadmap" },
] as const;
