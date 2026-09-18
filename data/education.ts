export type Education = {
  institution: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  gpa?: string;
  location: string;
  highlights: string[];
};

export const education: Education[] = [
  {
    institution: "New York University, Tandon School of Engineering",
    degree: "Master of Science",
    field: "Financial Engineering",
    start: "Aug 2025",
    end: "May 2027",
    gpa: "3.95 / 4.0",
    location: "Brooklyn, New York",
    highlights: [
      "Department: Finance & Risk Engineering (FRE)",
      "Coursework: Stochastic Calculus, Derivative Securities, Time-Series Analysis, ML in Financial Engineering, Probability & Statistics, Quantitative Portfolio Management, Financial Risk Management, Algorithmic Trading, Commodities, Blockchain",
      "Graduate Teaching Assistant: Financial Risk Management (Fall 2026) and Deep Learning Models in Finance, FRE-GY 7871 (Spring 2026)"
    ]
  },
  {
    institution: "Nirma University, Institute of Technology",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    start: "Aug 2021",
    end: "May 2025",
    location: "Ahmedabad, India",
    highlights: [
      "3 peer-reviewed publications (IEEE ISACC 2025 ×2, ICICT London 2025)",
      "Research mentor: Prof. Priyank Thakkar",
      "Focus: ML / DL / RL for finance, smart cities, and autonomous systems"
    ]
  }
];

export type Certification = {
  name: string;
  issuer: string;
  year: number;
  pdf?: string;
  image?: string;
  description?: string;
};

export const certifications: Certification[] = [
  {
    name: "IAQF 2026 Winner Announcement",
    issuer: "International Association for Quantitative Finance",
    year: 2026,
    pdf: "/certificates/iaqf-2026.pdf",
    description: "Winner, 15th Annual IAQF Academic Affiliate Student Competition (Team Captain, Team Sharpe Minds)."
  },
  {
    name: "Bloomberg Market Concepts (BMC)",
    issuer: "Bloomberg",
    year: 2025,
    pdf: "/certificates/bloomberg-bmc.pdf",
    description: "Equity markets, fixed income, FX, and macroeconomics. Bloomberg Terminal fundamentals."
  },
  {
    name: "Akuna Capital Options 201",
    issuer: "Akuna Capital",
    year: 2024,
    pdf: "/certificates/akuna-201.pdf",
    description: "Advanced options: market making, vol surfaces, skew, and trading technology. Selective entry via mental-math screen and interview."
  },
  {
    name: "Akuna Capital Options 101",
    issuer: "Akuna Capital",
    year: 2024,
    pdf: "/certificates/akuna-101.pdf",
    description: "Options fundamentals, payoffs, and the Greeks (Δ, Γ, Vega, Rho)."
  },
  {
    name: "GCAT Conference Presenter",
    issuer: "GCAT (Global Conference on Advanced Technologies)",
    year: 2024,
    image: "/certificates/gcat.png",
    description: "Presented Q-Learning Assisted Efficient Collision Detection and Avoidance Framework for Autonomous Vehicles in ITS at the GCAT conference."
  },
  {
    name: "ISACC 2025 Author / Presenter",
    issuer: "IEEE ISACC",
    year: 2025,
    image: "/certificates/isaac.png",
    description: "Co-author and presenter at IEEE ISACC 2025 (two papers)."
  }
];
