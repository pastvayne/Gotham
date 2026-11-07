export const docs = [
  {
    slug: "introduction",
    title: "Introduction",
    description: "What Gotham is, what it is not, and how the protocol differs from the $GOTHAM token.",
  },
  {
    slug: "why-privacy-matters",
    title: "Why privacy matters",
    description: "What a public Elysium transfer reveals, and what financial privacy can and cannot mean.",
  },
  {
    slug: "architecture",
    title: "Proposed architecture",
    description: "The shielded-pool design: notes, commitments, nullifiers, proofs, and what is actually in the repository.",
  },
  {
    slug: "elysium",
    title: "Elysium integration",
    description: "Network facts taken from Elysium's documentation, and the limits of what Gotham will not invent.",
  },
  {
    slug: "privacy-model",
    title: "Privacy model",
    description: "Which parts of a future Gotham transfer are meant to stay private, and which stay public.",
  },
  {
    slug: "threat-model",
    title: "Threat model",
    description: "Threats to a shielded pool on Elysium, what is mitigated, and what is still open.",
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    description: "Four phases from this site to a reviewed deployment. Nothing past design is claimed as done.",
  },
  {
    slug: "risks",
    title: "Risks and limitations",
    description: "Plain-language limits. Gotham is not deployed, not audited, and not a promise of anonymity.",
  },
  {
    slug: "faq",
    title: "FAQ",
    description: "Direct answers about deployment, the token, deposits, and what this site can do today.",
  },
] as const;

export type DocSlug = (typeof docs)[number]["slug"];

export function findDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
