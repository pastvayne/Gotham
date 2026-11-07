export const brand = {
  name: "GOTHAM",
  mark: "Gotham",
  tagline: "Privacy is power.",
  line: "Financial privacy for Elysium. Gotham is building a way to shield assets and transfer value with greater confidentiality.",
  narrative: "Even in paradise, some things are meant to remain unseen.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://trygotham.tech",
} as const;

export const navItems = [
  { href: "/#experience", label: "Experience" },
  { href: "/docs", label: "Docs" },
  { href: "/app", label: "App" },
] as const;

export const depths = [
  { id: "surface", label: "Gotham" },
  { id: "problem", label: "Problem" },
  { id: "experience", label: "Experience" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "roadmap", label: "Roadmap" },
] as const;
