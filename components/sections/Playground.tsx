"use client";

import { useId, useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import { impliedVol, priceAndGreeks, type Kind } from "@/lib/bs";

type Param = { key: "S" | "K" | "T" | "r" | "sigma"; label: string; min: number; max: number; step: number; unit: string };

const PARAMS: Param[] = [
  { key: "S", label: "Spot S", min: 50, max: 200, step: 1, unit: "" },
  { key: "K", label: "Strike K", min: 50, max: 200, step: 1, unit: "" },
  { key: "T", label: "Time to expiry T", min: 0.05, max: 3, step: 0.05, unit: "y" },
  { key: "r", label: "Risk-free rate r", min: 0, max: 10, step: 0.1, unit: "%" },
  { key: "sigma", label: "Volatility σ", min: 5, max: 100, step: 1, unit: "%" }
];

const fmt = (x: number, d = 2) =>
  Number.isFinite(x) ? x.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }) : "–";

function Slider({ p, value, onChange }: { p: Param; value: number; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <div className="grid grid-cols-[1fr_5.5rem] items-center gap-3">
      <label htmlFor={id} className="text-sm text-ink-2">
        {p.label}
      </label>
      <div className="flex items-baseline justify-end gap-1 font-mono text-sm text-ink tnum">
        <input
          type="number"
          value={value}
          min={p.min}
          max={p.max}
          step={p.step}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (Number.isFinite(v)) onChange(Math.min(p.max, Math.max(p.min, v)));
          }}
          className="w-16 border-0 border-b border-rule bg-transparent px-0 py-0.5 text-right text-sm text-ink focus:border-accent focus:outline-none"
          aria-label={`${p.label} value`}
        />
        <span className="text-muted">{p.unit}</span>
      </div>
      <input
        id={id}
        type="range"
        min={p.min}
        max={p.max}
        step={p.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="col-span-2"
      />
    </div>
  );
}

/** Price-vs-spot curve with the intrinsic value dashed and the current point marked. */
function Curve({ kind, S, K, T, r, sigma }: { kind: Kind; S: number; K: number; T: number; r: number; sigma: number }) {
  const W = 560;
  const H = 230;
  const pad = { l: 44, r: 12, t: 12, b: 28 };
  const lo = Math.max(1, K * 0.5);
  const hi = K * 1.5;
  const n = 80;
  const pts: [number, number][] = [];
  const intrinsic: [number, number][] = [];
  let maxY = 0;
  for (let i = 0; i <= n; i++) {
    const s = lo + ((hi - lo) * i) / n;
    const v = priceAndGreeks(kind, s, K, T, r, sigma).price;
    const iv = kind === "call" ? Math.max(s - K, 0) : Math.max(K - s, 0);
    pts.push([s, v]);
    intrinsic.push([s, iv]);
    maxY = Math.max(maxY, v, iv);
  }
  maxY = maxY * 1.08 || 1;
  const x = (s: number) => pad.l + ((s - lo) / (hi - lo)) * (W - pad.l - pad.r);
  const y = (v: number) => H - pad.b - (v / maxY) * (H - pad.t - pad.b);
  const path = (arr: [number, number][]) => arr.map(([s, v], i) => `${i ? "L" : "M"}${x(s).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const cur = priceAndGreeks(kind, S, K, T, r, sigma).price;
  const ticksX = [lo, K, hi];
  const ticksY = [0, maxY / 2, maxY];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label={`${kind} price as a function of spot`}>
      {ticksY.map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="var(--rule)" strokeWidth="1" />
          <text x={pad.l - 6} y={y(v) + 3} textAnchor="end" fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">
            {fmt(v, 0)}
          </text>
        </g>
      ))}
      {ticksX.map((s) => (
        <text key={s} x={x(s)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">
          {s === K ? `K=${fmt(K, 0)}` : fmt(s, 0)}
        </text>
      ))}
      <path d={path(intrinsic)} fill="none" stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 4" />
      <path d={path(pts)} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      {S >= lo && S <= hi && (
        <g>
          <line x1={x(S)} x2={x(S)} y1={y(0)} y2={y(cur)} stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx={x(S)} cy={y(cur)} r="4" fill="var(--paper)" stroke="var(--accent)" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}

export default function Playground() {
  const [kind, setKind] = useState<Kind>("call");
  const [v, setV] = useState({ S: 100, K: 100, T: 0.5, r: 4, sigma: 25 });
  const [mkt, setMkt] = useState("");

  const g = useMemo(() => priceAndGreeks(kind, v.S, v.K, v.T, v.r / 100, v.sigma / 100), [kind, v]);
  const iv = useMemo(() => {
    const target = Number(mkt);
    if (!mkt || !Number.isFinite(target) || target <= 0) return undefined;
    return impliedVol(kind, target, v.S, v.K, v.T, v.r / 100);
  }, [kind, mkt, v]);

  const rows: [string, string, string][] = [
    ["Delta Δ", fmt(g.delta, 3), "∂V/∂S"],
    ["Gamma Γ", fmt(g.gamma, 4), "∂²V/∂S²"],
    ["Vega", fmt(g.vega, 3), "per 1 vol point"],
    ["Theta Θ", fmt(g.theta, 3), "per calendar day"],
    ["Rho ρ", fmt(g.rho, 3), "per 1% of r"]
  ];

  return (
    <Section
      id="playground"
      number="05"
      title="Playground"
      intro={
        <>
          A small Black–Scholes pricer, computed in your browser. European option, no dividends. It is
          the same model the tool-calling LLM project learned to call instead of guessing.
        </>
      }
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-4 text-sm" role="group" aria-label="Option type">
            {(["call", "put"] as Kind[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                aria-pressed={kind === k}
                className={`link-quiet capitalize ${kind === k ? "text-ink underline decoration-accent underline-offset-4" : ""}`}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="mt-5 space-y-5">
            {PARAMS.map((p) => (
              <Slider key={p.key} p={p} value={v[p.key]} onChange={(val) => setV((s) => ({ ...s, [p.key]: val }))} />
            ))}
          </div>
        </div>

        <div>
          <div className="label">{kind} price</div>
          <div className="mt-1 text-4xl text-ink tnum">{fmt(g.price, 3)}</div>
          <p className="mt-1 font-mono text-[11px] text-muted tnum">
            d₁ = {fmt(g.d1, 4)} · d₂ = {fmt(g.d2, 4)}
          </p>
          <dl className="mt-5 border-t border-rule">
            {rows.map(([k, val, note]) => (
              <div key={k} className="grid grid-cols-[6rem_1fr_auto] items-baseline gap-3 border-b border-rule py-2 text-sm">
                <dt className="text-ink-2">{k}</dt>
                <dd className="font-mono text-ink tnum">{val}</dd>
                <dd className="text-xs text-muted">{note}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-4">
            <label className="block">
              <span className="label">Implied vol from a market price</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                value={mkt}
                onChange={(e) => setMkt(e.target.value)}
                placeholder={fmt(g.price, 2)}
                className="field mt-1 font-mono tnum"
                aria-label="Market option price"
              />
            </label>
            <div className="pb-2 font-mono text-sm text-ink tnum" aria-live="polite">
              {iv === undefined ? <span className="text-muted">σ = ?</span> : iv === null ? <span className="text-accent">no solution</span> : `σ = ${fmt(iv * 100, 2)}%`}
            </div>
          </div>
        </div>
      </div>

      <Curve kind={kind} S={v.S} K={v.K} T={v.T} r={v.r / 100} sigma={v.sigma / 100} />
      <p className="mt-1 text-xs text-muted">
        Solid: model price across spot. Dashed: intrinsic value. Marker: the current inputs.
      </p>
    </Section>
  );
}
