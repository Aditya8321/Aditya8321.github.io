import Section from "@/components/ui/Section";

export default function About() {
  return (
    <Section id="about" number="01" title="About">
      <div className="max-w-2xl space-y-5 text-pretty body text-[1rem]">
        <p>
          I came to finance from computer science. At Nirma University I spent most of my time on
          applied machine learning: TinyML on drones, Q-learning for collision avoidance, LSTMs on
          twenty years of equity data. Three of those projects became peer-reviewed papers, and one
          finding stuck with me: the models that worked were rarely the biggest ones.
        </p>
        <p>
          At NYU Tandon I have been filling in the other half: stochastic calculus, derivatives,
          risk management, portfolio theory. In spring 2026 I captained Team Sharpe Minds to win the
          15th IAQF student competition with a paper on what happens to stablecoins when the peg
          stops being believed. The SVB weekend in March 2023 was our natural experiment.
        </p>
        <p>
          The summer at Traxys was where the two halves met. I co-engineered a Monte Carlo,
          historical, and parametric VaR engine for a carbon-credits portfolio, and built Claude Code
          agents that took over fifteen-plus daily price-load and risk-report pipelines for the Global
          Middle Office. I care about systems that are correct, reproducible, and boring to operate.
        </p>
        <p className="text-muted">
          Away from a terminal: badminton for ten-plus years (state level back in India), and more
          recently tennis and pickleball.
        </p>
      </div>
    </Section>
  );
}
