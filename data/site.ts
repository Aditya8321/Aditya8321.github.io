// Public URL of the deployed site. The GitHub Actions workflow sets this to
// the Pages URL (or the custom domain, if one is configured in repo settings).
const url = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aditya8321.github.io").replace(/\/$/, "");

export const site = {
  name: "Aditya Shah",
  shortName: "Aditya",
  url,
  domain: url.replace(/^https?:\/\//, ""),
  email: "as22008@nyu.edu",
  github: "https://github.com/Aditya8321",
  githubHandle: "Aditya8321",
  linkedin: "https://linkedin.com/in/adityashah2901",
  linkedinHandle: "adityashah2901",
  repo: "https://github.com/Aditya8321/Aditya8321.github.io",
  location: "New York, NY",
  tagline: "Risk, derivatives, and applied AI",
  description:
    "Aditya Shah is a financial engineering master's student at NYU Tandon (3.95 GPA) who builds risk and AI systems for markets: a VaR engine for a $300M+ commodities book at Traxys, the IAQF 2026 competition-winning paper on stablecoin risk, and small language models fine-tuned to call option-pricing tools. Graduate TA for Financial Risk Management. Looking for Summer 2027 roles.",
  headline: "I build risk and AI systems for markets.",
  lede:
    "I'm a financial engineering master's student at NYU Tandon. Last summer I co-built the VaR engine for a $300M+ carbon-credits book at Traxys and automated a good part of the Global Middle Office's daily reporting; this fall I'm the teaching assistant for Financial Risk Management. Before that: a competition-winning paper on stablecoin runs, three IEEE/ICICT papers, and a habit of teaching small language models to call a pricing tool instead of guessing.",
  now: [
    { label: "Now", value: "Graduate TA, Financial Risk Management · NYU Tandon" },
    { label: "Last summer", value: "AI & Risk Management Intern · Traxys North America" },
    { label: "Looking for", value: "Spring 2027 internships and Summer 2027 full-time roles in risk, quant, and AI for markets" }
  ]
} as const;

export type Site = typeof site;
