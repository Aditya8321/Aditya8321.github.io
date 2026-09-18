export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  upcoming?: boolean;
  bullets: string[];
  tags?: string[];
};

export const experience: Experience[] = [
  {
    company: "NYU Tandon School of Engineering",
    role: "Graduate Teaching Assistant, Financial Risk Management",
    location: "Brooklyn, NY",
    start: "Sep 2026",
    end: "Present",
    current: true,
    bullets: [
      "Supporting 20+ graduate students across market, credit, liquidity, operational, and model risk.",
      "Guiding students through VaR, expected shortfall, PV01-neutral hedges, CDS-implied default rates, and CVA.",
      "Grading homework and quizzes and holding regular weekly office hours."
    ],
    tags: ["Risk Management", "Teaching", "VaR & ES", "Credit Risk"]
  },
  {
    company: "Traxys North America LLC",
    role: "AI & Risk Management Intern",
    location: "New York, NY",
    start: "Jun 2026",
    end: "Aug 2026",
    bullets: [
      "Co-engineered a Python VaR engine (Monte Carlo, historical, and parametric) with risk decomposition, P&L drawdown, and stress testing for a $300M+ carbon-credits portfolio of inventory, forwards, options, and ACP put-floor futures.",
      "Built agentic workflows (Claude Code skills + routines) that automated 15+ daily price-load and risk-reporting pipelines across 10+ commodity desks for the Global Middle Office, cutting manual processing by 17+ hours per week.",
      "Monitored daily VaR utilization across 50+ trader groups, surfacing 10+ limit breaches monthly for timely risk action.",
      "Automated daily analysis of forward curves and Greeks on cobalt derivatives to flag P&L swings above 5%."
    ],
    tags: ["VaR Engine", "Agentic AI", "Commodities", "Middle Office"]
  },
  {
    company: "NYU Tandon School of Engineering",
    role: "Graduate Teaching Assistant, Deep Learning Models in Finance (FRE-GY 7871)",
    location: "Brooklyn, NY",
    start: "Mar 2026",
    end: "May 2026",
    bullets: [
      "Teaching assistant for Prof. Ken Perry's graduate course on deep learning applied to financial markets.",
      "Fine-tuned SmolLM2 via LoRA-SFT and GRPO RL to call a Black-Scholes option-pricing tool, lifting tool-call parse rate from 0% to 100% and average reward from -0.117 to 1.033 with zero catastrophic forgetting.",
      "Mentored 23 graduate students across two final projects, grading submissions and holding regular weekly office hours."
    ],
    tags: ["Deep Learning", "GRPO", "LoRA", "Teaching"]
  },
  {
    company: "IAQF, International Association for Quantitative Finance",
    role: "Team Captain, Team Sharpe Minds (Winner, 15th Annual Student Competition)",
    location: "Remote / NYU Tandon",
    start: "Jan 2026",
    end: "Apr 2026",
    bullets: [
      "Captained a six-person team to win the 15th Annual IAQF Academic Affiliate Student Competition (6 winners selected from 31 submissions across 15 academic programs).",
      "Co-authored the winning paper Pegged Until It's Not: Stablecoin Risk and Market Dislocation, examining cross-currency dynamics under the GENIUS Act with the March 2023 SVB episode as a natural experiment.",
      "Advised by Prof. Andrey Itkin; coordinated research, modeling, and writing across the team."
    ],
    tags: ["Stablecoins", "Cross-currency", "Crisis Modeling", "Research"]
  },
  {
    company: "Prowess Consulting LLC",
    role: "Data Scientist Intern",
    location: "Ahmedabad, Gujarat, India",
    start: "Jan 2025",
    end: "May 2025",
    bullets: [
      "Reduced 100K features to 200 principal components via Truncated PCA on 33K-ZIP-code Census data, cutting Snowflake query time by 60% and enabling K-Means clustering of 5 socio-economic profiles.",
      "Launched QueryBot, a natural-language-to-SQL assistant (LangChain + GPT-4), cutting analyst query turnaround from 2 hours to under 5 minutes.",
      "Automated a job-market analytics pipeline in Python scraping 1,000+ postings weekly from 50+ financial institutions."
    ],
    tags: ["PCA", "Snowflake", "LangChain", "NL-to-SQL"]
  },
  {
    company: "Binghamton University",
    role: "Research Assistant",
    location: "Remote",
    start: "Aug 2024",
    end: "Dec 2024",
    bullets: [
      "Benchmarked 7 ML/DL models (LSTM, CNN, ANN, SVM, Random Forest) on 20 years of equity data; a one-layer LSTM reached 87% next-day directional accuracy, outperforming every deeper baseline.",
      "Work accepted as a peer-reviewed paper at ICICT 2025 (London).",
      "Developed a Deep Q-Learning agent for multi-stock execution, outperforming buy-and-hold by 12% over a 252-day backtest."
    ],
    tags: ["LSTM", "Deep Q-Learning", "Research", "Equities"]
  },
  {
    company: "DRC Systems",
    role: "Machine Learning Intern",
    location: "Gandhinagar, Gujarat, India",
    start: "Jun 2024",
    end: "Jul 2024",
    bullets: [
      "Deployed a BERT-based resume parsing pipeline (NER, QA, zero-shot classification) processing 10,000+ resumes.",
      "Achieved 92% entity-extraction F1, cutting recruiter screening time by 70% and saving 2+ hours daily.",
      "Productionized the model with Python tooling and integration into the recruiting workflow."
    ],
    tags: ["BERT", "NLP", "Python", "Deep Learning"]
  },
  {
    company: "4C Consulting (Technology Division)",
    role: "Data Analyst Intern",
    location: "Ahmedabad, Gujarat, India",
    start: "Jul 2023",
    end: "Aug 2023",
    bullets: [
      "Constructed end-to-end preprocessing pipelines (imputation, encoding, outlier removal) on 50,000+ banking records.",
      "Improved downstream model AUC from 0.72 to 0.84 (+17%) through cleaner feature engineering.",
      "Built reporting and visualization dashboards in Tableau and PowerBI for the consulting team."
    ],
    tags: ["Data Analytics", "Tableau", "PowerBI", "Banking"]
  }
];
