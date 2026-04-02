export const CONTACT_LINK_ITEMS = [
  {
    id: "github",
    kind: "link" as const,
    href: "https://github.com/nsong113",
    label: "GitHub Profile",
    icon: "github" as const,
  },
  {
    id: "linkedin",
    kind: "link" as const,
    href: "https://www.linkedin.com/in/jiu-song-nsong113/",
    label: "LinkedIn Profile",
    icon: "linkedin" as const,
  },
  {
    id: "email",
    kind: "email" as const,
    label: "nsong113@gmail.com",
    icon: "mail" as const,
  },
] as const;

export type ContactLinkItem = (typeof CONTACT_LINK_ITEMS)[number];
