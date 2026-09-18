export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Quantitative Finance",
    items: [
      "Derivatives Pricing",
      "Black–Scholes",
      "Heston Model",
      "Merton Jump-Diffusion",
      "GARCH",
      "Monte Carlo",
      "Vasicek Rates",
      "Greeks & Hedging",
      "Implied Volatility",
      "Forward Curves"
    ]
  },
  {
    category: "Risk & Portfolio",
    items: [
      "Value at Risk (Historical / Parametric / MC)",
      "Expected Shortfall (CVaR)",
      "Risk Decomposition",
      "Stress Testing",
      "P&L Drawdown Analysis",
      "Kupiec & Christoffersen Backtests",
      "Component VaR",
      "Ledoit–Wolf Shrinkage",
      "Mean–Variance Optimization",
      "Tracking Error",
      "Fama–French Attribution"
    ]
  },
  {
    category: "Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "XGBoost",
      "Random Forest",
      "BERT",
      "LSTM / RNN",
      "CNNs",
      "Reinforcement Learning",
      "Q-Learning",
      "TinyML"
    ]
  },
  {
    category: "LLMs & Agentic AI",
    items: [
      "Hugging Face",
      "PEFT / LoRA",
      "TRL",
      "RLHF (SFT, PPO, GRPO, DAPO)",
      "Transformers",
      "RAG",
      "FAISS",
      "LangChain",
      "Agentic AI",
      "MCP",
      "Claude Code"
    ]
  },
  {
    category: "Languages & Tools",
    items: [
      "Python",
      "R",
      "C / C++",
      "Java",
      "SQL",
      "Bash",
      "Git",
      "CI/CD",
      "AWS",
      "Jupyter",
      "Streamlit",
      "pandas",
      "NumPy",
      "SciPy",
      "Power BI",
      "Tableau",
      "Excel",
      "Bloomberg Terminal"
    ]
  },
  {
    category: "Data & Markets",
    items: [
      "Snowflake",
      "PostgreSQL",
      "SQL Server",
      "FRED",
      "yfinance",
      "Options Chain Data",
      "Commodity Forward Curves",
      "ETF Universe Construction",
      "Cross-Asset Datasets",
      "Time-Series Econometrics"
    ]
  }
];
