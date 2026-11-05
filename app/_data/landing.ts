export const landingCopy = {
  hero: {
    eyebrow: "Early access",
    headline: {
      before: "An ",
      accent: "outpost",
      after: " for whatever you're building",
    },
    subtitle:
      "A shared workspace where your AI agent can think, write, and sketch alongside you.",
    actions: [
      { label: "Start building free", href: "/sign-up", primary: true },
      { label: "See how it works", href: "#how-it-works", primary: false },
    ],
    videoAlt: "Preview of the Outpost workspace",
  },
  audiences: [
    "Product teams",
    "Founders",
    "Solo builders",
    "Agencies",
    "Consultants",
  ],
  features: {
    eyebrow: "One agent. One workspace. Your whole team.",
    heading: "One agent, one workspace, your whole team",
    items: [
      {
        title: "Canvas",
        icon: "canvas",
        description:
          "An infinite whiteboard where the agent draws flowcharts, ERDs, architecture diagrams, and org charts shape by shape, then edits them in place when you ask.",
        bullets: [
          "Turn a prompt into a diagram, one shape at a time",
          "Refine any part of the canvas with a request",
          "Map systems, data, processes, and teams",
        ],
      },
      {
        title: "Docs",
        icon: "docs",
        description:
          "A block editor where the agent turns a diagram into a written spec, and rewrites or summarizes sections on command.",
        bullets: [
          "Go from shared diagram to written spec",
          "Rewrite or summarize any section on demand",
          "Keep thinking and documentation together",
        ],
      },
      {
        title: "Team board",
        icon: "board",
        description:
          "A kanban board of every workspace in your organization, with live cursors so teammates can jump in together.",
        bullets: [
          "See work across every workspace in your org",
          "Track progress on a shared kanban board",
          "Jump in together with live cursors",
        ],
      },
    ],
  },
  howItWorks: {
    eyebrow: "A clear path from idea to done",
    heading: "How it works",
    steps: [
      {
        title: "Describe it",
        description:
          "Tell your agent what you’re thinking, in your own words. Start rough; you can shape the details together.",
      },
      {
        title: "Watch the agent draw",
        description:
          "See your ideas become a living canvas, with every shape and connection taking form as the agent works.",
      },
      {
        title: "Keep iterating together",
        description:
          "Ask for changes, turn the result into a doc, and bring your team in whenever you’re ready.",
      },
    ],
  },
  pricing: {
    eyebrow: "Straightforward plans",
    heading: "Pricing",
    description:
      "Upgrade your account or your team's account. Billed per member",
  },
  closingCta: {
    eyebrow: "Your next idea starts here",
    heading: "Make room for what you're building.",
    description:
      "Bring your ideas, your team, and your agent into one shared workspace.",
    action: "Start building free",
  },
  footer: "Made by Mohammad Hadi",
} as const;
