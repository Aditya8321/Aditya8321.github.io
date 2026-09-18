export type ProjectCategory =
  | "Quant Trading"
  | "Risk Analytics"
  | "Portfolio Management"
  | "Quant Research"
  | "Derivatives & Models"
  | "AI & ML"
  | "Foundational ML";

export type Project = {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  category: ProjectCategory;
  tech: string[];
  highlights: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  github?: string;
};

export const projects: Project[] = [
  {
    id: "options-model-validation",
    title: "Options Model Validation - BSM vs GBM-MC vs Heston vs Merton Jump",
    oneLiner:
      "Out-of-sample comparison of four option-pricing models against real SPY market quotes, with Vasicek stochastic discounting.",
    description:
      "Backtests Black–Scholes, GBM Monte Carlo, Heston (stochastic volatility), and Merton Jump-Diffusion against bid/ask/mark/IV quotes from a historical options-chain dataset (2008–2025). Calibrates Heston and Merton once at t₀, then evaluates out-of-sample on subsequent dates. Discount factors come from a Vasicek short-rate model fit to FRED 6-month Treasury yields. Scoring uses RMSE, vega-scaled RMSE, and percentage of predictions within the bid–ask spread.",
    category: "Derivatives & Models",
    tech: ["Python", "QuantLib", "FRED", "Monte Carlo", "Calibration"],
    highlights: [
      "Real SPY option market quotes (2008–2025)",
      "Vasicek stochastic discounting from Treasury yields",
      "Strict t₀ calibration → out-of-sample evaluation",
      "Vega-scaled RMSE + bid-ask hit-rate metrics"
    ],
    featured: true
  },
  {
    id: "market-risk-engine",
    title: "Multi-Asset VaR & CVaR Risk Engine with Backtesting & Stress Tests",
    oneLiner:
      "Production-style market-risk framework: Historical, Parametric, and Monte Carlo VaR with Kupiec & Christoffersen backtests across a 10-asset portfolio.",
    description:
      "End-to-end VaR/CVaR system over a 3,536-day multi-asset book (SPY, QQQ, IWM, EFA, EEM, IEF, TLT, LQD, HYG, GLD) at 95% and 99% confidence. Uses Ledoit–Wolf shrinkage for Monte Carlo covariance. Formal Kupiec and Christoffersen tests reveal that Parametric and MC VaR materially underestimate 99% tail risk during regime shifts, with breach clustering during COVID-19. Stress scenarios (equity −20% / rates +100bp, risk-off −10% equity / −8% credit) quantify non-linear losses VaR alone misses.",
    category: "Risk Analytics",
    tech: ["Python", "NumPy", "SciPy", "Ledoit-Wolf", "Backtesting"],
    highlights: [
      "3 VaR methodologies + CVaR @ 95% & 99%",
      "Kupiec (UC) + Christoffersen (CC) backtests",
      "Macro stress scenarios with non-linear loss attribution",
      "504-day rolling lookback windows"
    ],
    image: "/projects/market-risk/breaches.png",
    imageAlt: "VaR breach plot showing clustering during high-volatility periods",
    featured: true
  },
  {
    id: "delta-hedge-aapl",
    title: "Volatility-Targeted Delta-Hedged Options Strategy (AAPL)",
    oneLiner:
      "Isolates volatility exposure on AAPL through systematic delta hedging with realized-volatility-driven IV proxy.",
    description:
      "Reconstructs AAPL option prices and Greeks via Black–Scholes with a time-varying implied-vol proxy derived from realized volatility. Holds short-dated ATM options, continuously delta-hedges with the underlying, and scales position size to a target portfolio volatility. Evaluates P&L under realistic trading and financing assumptions, decomposing returns into gamma, vega, and hedging-cost components.",
    category: "Quant Trading",
    tech: ["Python", "Black–Scholes", "Vol Targeting", "Greeks"],
    highlights: [
      "Systematic delta hedging with daily rebalancing",
      "Volatility-targeted position sizing",
      "Realized-vol-based IV proxy (chain-data-free)",
      "Greeks-decomposed P&L attribution"
    ],
    image: "/projects/delta-hedge-aapl/nav.png",
    imageAlt: "NAV curve of delta-hedged AAPL options strategy",
    featured: true
  },
  {
    id: "vol-regime-strategy",
    title: "Volatility-Regime SPY Trading Strategy",
    oneLiner:
      "Dynamic exposure to SPY based on identified volatility regimes - risk-managed sizing beats buy-and-hold on risk-adjusted basis.",
    description:
      "Classifies SPY into volatility regimes and scales exposure accordingly. Reduces drawdowns during high-vol periods, maintains exposure during stable regimes, and minimizes turnover. Evaluated with realistic transaction costs across the full sample, achieving superior Sharpe and Calmar versus passive SPY.",
    category: "Quant Trading",
    tech: ["Python", "Regime Detection", "Vol Targeting"],
    highlights: [
      "Regime-conditional position sizing",
      "Lower drawdowns vs SPY buy-and-hold",
      "Low-turnover, transaction-cost realistic"
    ],
    image: "/projects/vol-regime/nav.png",
    imageAlt: "NAV of volatility-regime strategy versus SPY buy-and-hold",
    featured: true
  },
  {
    id: "factor-risk-decomposition",
    title: "Factor-Based Risk Decomposition & Component VaR",
    oneLiner:
      "Fama–French factor model decomposes total portfolio risk into systematic vs idiosyncratic components and attributes tail risk to individual holdings.",
    description:
      "Risk-analyst framework that attributes portfolio risk to underlying factors and computes Component VaR - identifying which assets drive tail risk. Built on a 10-asset multi-asset ETF universe with 504-day rolling estimation. Outputs include factor-contribution charts and component-VaR percentages at 99%.",
    category: "Risk Analytics",
    tech: ["Python", "Fama–French", "Risk Attribution"],
    highlights: [
      "Systematic vs idiosyncratic risk decomposition",
      "Component VaR contribution per holding",
      "Fama–French 3-factor regression attribution"
    ],
    image: "/projects/factor-risk/component-var.png",
    imageAlt: "Component VaR contributions by asset at 99% confidence",
    featured: true
  },
  {
    id: "liquidity-fire-sale-risk",
    title: "Liquidity Risk & Fire-Sale Stress Testing",
    oneLiner:
      "Quantifies how trading constraints and market impact amplify portfolio losses under forced liquidation.",
    description:
      "Extends standard VaR by incorporating liquidation costs, market impact, and fire-sale dynamics. Models a 30% forced liquidation over a 5-day horizon with a 10% ADV participation cap. Outputs days-to-liquidate per holding and VaR uplift attributable to liquidity friction.",
    category: "Risk Analytics",
    tech: ["Python", "Market Impact", "Stress Testing"],
    highlights: [
      "ADV-constrained liquidation modeling",
      "Liquidity-adjusted VaR uplift quantification",
      "Days-to-liquidate per asset"
    ],
    image: "/projects/liquidity-risk/var-uplift.png",
    imageAlt: "Liquidity-adjusted VaR uplift at 95% confidence"
  },
  {
    id: "portfolio-optimizer",
    title: "Constrained Portfolio Optimization & Efficient Frontier",
    oneLiner:
      "Mean–variance optimization with Ledoit–Wolf shrinkage, monthly rebalancing, and transaction-cost-aware evaluation.",
    description:
      "Builds the efficient frontier under long-only constraints with shrinkage covariance estimation. Backtests max-Sharpe, min-variance, and equal-weight portfolios under monthly rebalancing with turnover-based transaction costs. Evaluates risk-adjusted performance, drawdowns, and stability across regimes.",
    category: "Portfolio Management",
    tech: ["Python", "Mean–Variance", "Ledoit–Wolf", "Backtesting"],
    highlights: [
      "Long-only MV optimization with shrinkage covariance",
      "Monthly rebalancing + transaction costs",
      "Max-Sharpe, Min-Var, and Equal-Weight comparison"
    ],
    image: "/projects/portfolio-optimizer/efficient-frontier.png",
    imageAlt: "Efficient frontier with optimized portfolios"
  },
  {
    id: "rebalance-drift",
    title: "Dynamic Rebalancing & Drift–Cost Analysis",
    oneLiner:
      "Studies the trade-off between rebalancing frequency, drift, turnover, and risk-adjusted performance.",
    description:
      "Operational portfolio-management study comparing month-end, quarter-end, and year-end rebalancing on an equal-weight equity-index portfolio. Quantifies allocation drift, turnover, and cost-adjusted Sharpe under realistic transaction-cost assumptions.",
    category: "Portfolio Management",
    tech: ["Python", "Rebalancing", "Transaction Costs"],
    highlights: [
      "ME / QE / YE rebalancing comparison",
      "Drift, turnover, and cost-Sharpe trade-offs",
      "Operational PM lens (not optimization)"
    ]
  },
  {
    id: "te-constrained-active",
    title: "Tracking-Error-Constrained Active Portfolio",
    oneLiner:
      "Benchmark-relative active portfolio construction with explicit tracking-error budgets and information-ratio analysis.",
    description:
      "Builds active portfolios on a U.S. large-cap universe by allocating active-risk budgets relative to a benchmark. Evaluates active returns, information ratio, and drawdowns across TE constraints - reflecting how institutional active managers operate in practice.",
    category: "Portfolio Management",
    tech: ["Python", "Active Risk", "Optimization"],
    highlights: [
      "Tracking-error-constrained optimization",
      "Information ratio across TE budgets",
      "Benchmark-relative drawdown analysis"
    ]
  },
  {
    id: "factor-alpha-research",
    title: "Cross-Sectional Factor Alpha Research",
    oneLiner:
      "Tests six widely studied factor signals via monthly decile portfolios; attributes returns through CAPM & Fama–French regressions.",
    description:
      "Long–short alpha research framework. Constructs decile portfolios on six cross-sectional signals (e.g., value, momentum, quality) and regresses returns against CAPM and Fama–French factors to isolate true alpha from factor exposure.",
    category: "Quant Research",
    tech: ["Python", "Decile Portfolios", "Factor Regression"],
    highlights: [
      "Six cross-sectional signal evaluations",
      "Long–short decile portfolio construction",
      "CAPM + Fama–French alpha attribution"
    ]
  },
  {
    id: "ts-momentum",
    title: "Time-Series Momentum & Trend-Following Research",
    oneLiner:
      "Canonical 12–1 time-series momentum across a diversified multi-asset universe with vol-targeting and turnover costs.",
    description:
      "Studies the persistence of directional trends across asset classes using a 12-1 TSMOM signal. Implements portfolio-level vol targeting and turnover-based transaction costs. Analyzes signal behavior, turnover, and drawdowns under realistic implementation.",
    category: "Quant Research",
    tech: ["Python", "Time-Series Momentum", "Vol Targeting"],
    highlights: [
      "12-month / 1-month TSMOM signal",
      "Multi-asset robustness analysis",
      "Vol-targeted, turnover-aware backtest"
    ]
  },
  {
    id: "alpha-generation-india",
    title: "Indian Momentum-Based Systematic Strategy",
    oneLiner:
      "Momentum strategy on Indian equities (Nifty 100 / Midcap 150 / Smallcap 250) with cap-tier-aware portfolio construction.",
    description:
      "Builds a momentum-ranked systematic strategy across the NIFTY 100, NIFTY Midcap 150, and NIFTY Smallcap 250 universes. Tests how momentum behavior differs across capitalization tiers and constructs cap-aware long-only portfolios with monthly rebalancing.",
    category: "Quant Trading",
    tech: ["Python", "Jupyter", "yfinance", "Pandas"],
    highlights: [
      "NIFTY 100 / Midcap 150 / Smallcap 250 universes",
      "Cross-cap momentum behavior comparison",
      "Cap-aware long-only construction"
    ]
  },
  {
    id: "bond-trading",
    title: "International Bond Trading Backtest",
    oneLiner:
      "Hypothesis-driven sovereign-bond strategy combining policy rates, breakeven inflation, FX spot, and bond yields across countries.",
    description:
      "Unified cross-country dataset (policy rates, breakeven inflation, FX spot, bond yields) feeds a hypothesis-driven sovereign-bond backtest. Evaluates risk-adjusted returns, rolling Sharpe ratios, and monthly return distributions across countries.",
    category: "Quant Trading",
    tech: ["Python", "R", "Cross-Country Data", "Bond Strategy"],
    highlights: [
      "Unified policy / inflation / FX / yield panel",
      "Hypothesis-driven sovereign bond strategy",
      "12-month rolling Sharpe diagnostics"
    ],
    image: "/projects/bond-trading/cumulative-returns.png",
    imageAlt: "Cumulative returns of international bond strategy"
  },
  {
    id: "garch-spx",
    title: "GARCH Volatility Simulation & Option Pricing (SPX)",
    oneLiner:
      "GARCH-fitted volatility paths drive Monte Carlo option pricing under GBM dynamics and compares against BSM.",
    description:
      "Fits GARCH on SPX returns, simulates volatility and GBM paths, prices European calls via Monte Carlo, and benchmarks against Black–Scholes. Includes an implied-volatility solver and direct closed-form vs Monte Carlo comparison.",
    category: "Derivatives & Models",
    tech: ["Python", "GARCH", "Monte Carlo", "GBM", "BSM"],
    highlights: [
      "GARCH-driven volatility path simulation",
      "MC option pricing under GBM",
      "BSM vs MC convergence diagnostics"
    ]
  },
  {
    id: "reasoning-model-sft-dapo",
    title: "Reasoning Model Pipeline - SmolLM2 with SFT + DAPO",
    oneLiner:
      "Turned a 360M-parameter SmolLM2 into a chain-of-thought reasoning model via tokenizer surgery, LoRA-SFT on DeepSeek-R1 traces, and DAPO RL with verifiable rewards - 2.25× GSM8K accuracy.",
    description:
      "Two-stage post-training pipeline for small reasoning models. Stage one performs tokenizer surgery to add reasoning-specific special tokens, then runs LoRA supervised fine-tuning on 1K DeepSeek-R1 reasoning traces to teach the think-then-answer format. Stage two applies DAPO (Decoupled Clip and Dynamic Sampling Policy Optimization) reinforcement learning with verifiable math rewards. The resulting 360M model reaches 2.25× the GSM8K accuracy of the base model.",
    category: "AI & ML",
    tech: ["Python", "PyTorch", "Hugging Face TRL", "PEFT / LoRA", "DAPO"],
    highlights: [
      "360M-parameter SmolLM2 base",
      "Tokenizer surgery + LoRA-SFT on 1K DeepSeek-R1 traces",
      "DAPO RL with verifiable rewards",
      "2.25× GSM8K accuracy vs base model"
    ],
    featured: true
  },
  {
    id: "llm-option-pricing-tool-calls",
    title: "LLM Tool-Calling for Option Pricing - LoRA-SFT + GRPO",
    oneLiner:
      "Fine-tuned SmolLM2 to reliably call a Black-Scholes pricing tool: parse rate 0% → 100%, average reward -0.117 → 1.033, zero catastrophic forgetting.",
    description:
      "Research project with Prof. Ken Perry for NYU Tandon's Deep Learning Models in Finance course. A small LLM is taught to price options by calling a Black-Scholes tool instead of hallucinating numbers. Stage one: LoRA supervised fine-tuning on a curated 8,000-sample corpus of tool-call demonstrations. Stage two: GRPO reinforcement learning on a 1,200-prompt set with a verifiable reward for well-formed, correctly-parameterized tool calls. Tool-call parse rate rose from 0% to 100% and average reward from -0.117 to 1.033, with no measurable regression on the model's general capabilities.",
    category: "AI & ML",
    tech: ["Python", "PyTorch", "Hugging Face TRL", "PEFT / LoRA", "GRPO"],
    highlights: [
      "Tool-call parse rate: 0% → 100%",
      "Average reward: -0.117 → 1.033",
      "LoRA-SFT (8K samples) → GRPO RL (1.2K prompts)",
      "Zero catastrophic forgetting"
    ],
    featured: true
  },
  {
    id: "finance-rag-assistant",
    title: "Finance RAG Assistant - LLM Document Intelligence",
    oneLiner:
      "Citation-backed RAG over 10-Ks, 10-Qs, and earnings transcripts. FAISS retrieval + LLM generation, deployed as a Streamlit app.",
    description:
      "End-to-end retrieval-augmented generation for financial filings. Ingests 10+ SEC filings (10-K / 10-Q) and earnings transcripts, chunks and embeds them into a 1,000+ chunk FAISS index, retrieves the top-3 passages per query, and generates answers with explicit source citations. Achieves 89% answer relevance on an evaluation set while cutting API costs by 50% through retrieval-scoped prompting. Designed to minimize hallucination and provide an auditable evidence trail.",
    category: "AI & ML",
    tech: ["Python", "LangChain", "FAISS", "OpenAI", "Streamlit"],
    highlights: [
      "10+ SEC filings, 1,000+ indexed chunks, top-3 retrieval",
      "89% answer relevance, 50% lower API cost",
      "Citation-backed answers, hallucination guards",
      "Streamlit UI for real-time querying"
    ],
    image: "/projects/rag-assistant/screenshot-1.png",
    imageAlt: "Finance RAG Assistant UI showing citation-backed answers",
    featured: true
  },
  {
    id: "market-anomaly-detection",
    title: "Market Anomaly Detection (Unsupervised ML)",
    oneLiner:
      "Point-in-time anomaly pipeline over 8 liquid ETFs that ensembles Isolation Forest with rolling z-score detectors and captures 41% of top-1% absolute-move days.",
    description:
      "Streaming-ready, point-in-time anomaly-detection framework over 8 liquid ETFs. Engineers return, volatility, and volume features, then ensembles an Isolation Forest with rolling z-score detectors so that interpretable rules and unsupervised ML vote together. Validated with event-study analysis against forward returns: the ensemble flags 41% of the top-1% absolute-move days while keeping the alert budget small, so detected anomalies are economically meaningful rather than just statistical outliers.",
    category: "AI & ML",
    tech: ["Python", "Isolation Forest", "Unsupervised ML", "Event Study"],
    highlights: [
      "8-ETF universe, point-in-time (no look-ahead) pipeline",
      "Isolation Forest + rolling z-score ensemble on return / vol / volume",
      "Captures 41% of top-1% absolute-move days",
      "Event-study validation against forward returns"
    ],
    featured: true
  },
  {
    id: "bank-churn-ml",
    title: "Bank Customer Churn Prediction & ROI Simulator",
    oneLiner:
      "Churn-prediction pipeline with lift analysis and a retention-campaign ROI simulator tying ML outputs to business P&L.",
    description:
      "End-to-end churn ML pipeline with strong emphasis on decision quality. Beyond AUC and accuracy, the project includes lift-curve analysis and a retention-campaign ROI simulator - translating model scores into concrete revenue-saved estimates per intervention strategy.",
    category: "AI & ML",
    tech: ["Python", "scikit-learn", "Lift Analysis", "ROI Simulation"],
    highlights: [
      "Full ML pipeline (EDA → model → eval)",
      "Lift curves for targeting prioritization",
      "Retention-campaign ROI simulator"
    ]
  },
  {
    id: "apple-stock-prediction",
    title: "AAPL Multi-Asset Return Prediction (R)",
    oneLiner:
      "Predicts next-day AAPL returns from technical indicators, volatility measures, and cross-asset features - built in R.",
    description:
      "Econometrics-aware modeling pipeline in R. Predicts returns (not prices) for stationarity, engineers technical / volatility / volume features, and incorporates cross-asset signals from correlated stocks and ETFs.",
    category: "Foundational ML",
    tech: ["R", "Time Series", "Econometrics"],
    highlights: [
      "Returns-target (stationarity-correct)",
      "Cross-asset feature engineering",
      "Volatility + technical indicators"
    ]
  },
  {
    id: "bankruptcy-prediction",
    title: "Bankruptcy Prediction (R, ML)",
    oneLiner:
      "Supervised classification on 4,818 firms × 64 financial ratios with ROC analysis and class-imbalance handling.",
    description:
      "Predicts firm-level bankruptcy using a 4,818-row dataset of 64 financial ratios. Compares logistic regression, decision trees, and ensemble methods. ROC analysis quantifies the precision–recall trade-off under heavy class imbalance.",
    category: "Foundational ML",
    tech: ["R", "Classification", "ROC Analysis"],
    highlights: [
      "64-feature financial-ratio dataset",
      "Multiple classifier comparison",
      "ROC-driven model selection"
    ],
    image: "/projects/bankruptcy-pred/roc-curves.png",
    imageAlt: "ROC curves comparing bankruptcy-prediction classifiers"
  },
  {
    id: "stress-testing-engine",
    title: "Stress Testing Engine",
    oneLiner:
      "Macro-scenario stress framework that maps shocks to portfolio P&L under non-linear loss assumptions.",
    description:
      "Lightweight scenario engine that translates equity / rate / credit / FX shocks into portfolio losses. Designed to plug into broader risk-analytics stacks for what-if analysis.",
    category: "Risk Analytics",
    tech: ["Python", "Scenario Analysis"],
    highlights: [
      "Custom macro-scenario library",
      "Non-linear loss mapping",
      "Plug-in design for analytics stacks"
    ]
  },
  {
    id: "greeks-dashboard",
    title: "Options Greeks Risk Dashboard",
    oneLiner:
      "Real-time Greeks (Δ Γ Θ Vega Rho) dashboard for an options book - built to support sizing and hedging decisions.",
    description:
      "Live dashboard summarizing position-level and book-level Greeks. Designed to surface concentration risk and inform hedging decisions for an options book.",
    category: "Risk Analytics",
    tech: ["Python", "Streamlit", "Greeks"],
    highlights: [
      "Position + book-level Greeks aggregation",
      "Concentration & hedging diagnostics",
      "Interactive dashboard"
    ]
  },
  {
    id: "interest-rate-spread-risk",
    title: "Interest Rate Spread Risk",
    oneLiner:
      "Decomposes fixed-income book risk into level, slope, and curvature factors; quantifies spread DV01.",
    description:
      "Term-structure risk analytics: decomposes yield-curve movements into level / slope / curvature factors and computes spread-driven DV01 exposures.",
    category: "Risk Analytics",
    tech: ["Python", "Term Structure", "DV01"],
    highlights: [
      "Level / slope / curvature decomposition",
      "Spread DV01 exposure mapping",
      "Curve-shape sensitivity analysis"
    ]
  }
];

export const projectCategories: ProjectCategory[] = [
  "Quant Trading",
  "Risk Analytics",
  "Portfolio Management",
  "Quant Research",
  "Derivatives & Models",
  "AI & ML",
  "Foundational ML"
];
