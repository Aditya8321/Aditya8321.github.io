/**
 * Black–Scholes–Merton for a European option on a non-dividend-paying asset.
 * Rates and vols are decimals (0.04, 0.25); T is in years.
 */

/** Standard normal CDF via erfc (Numerical Recipes erfcc, |error| < 1.2e-7). */
export function normCdf(x: number): number {
  const z = Math.abs(x) / Math.SQRT2;
  const t = 1 / (1 + 0.5 * z);
  const r =
    t *
    Math.exp(
      -z * z -
        1.26551223 +
        t *
          (1.00002368 +
            t *
              (0.37409196 +
                t *
                  (0.09678418 +
                    t *
                      (-0.18628806 +
                        t *
                          (0.27886807 +
                            t *
                              (-1.13520398 +
                                t * (1.48851587 + t * (-0.82215223 + t * 0.17087277))))))))
    );
  const erfc = x >= 0 ? r : 2 - r; // erfc(x/√2)
  return 1 - 0.5 * erfc;
}

export function normPdf(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

export type Kind = "call" | "put";

export type Greeks = {
  price: number;
  delta: number;
  gamma: number;
  /** per 1 percentage point of volatility */
  vega: number;
  /** per calendar day */
  theta: number;
  /** per 1 percentage point of the rate */
  rho: number;
  d1: number;
  d2: number;
};

export function priceAndGreeks(kind: Kind, S: number, K: number, T: number, r: number, sigma: number): Greeks {
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const disc = Math.exp(-r * T);
  const pdf = normPdf(d1);
  const gamma = pdf / (S * sigma * sqrtT);
  const vega = (S * pdf * sqrtT) / 100;
  if (kind === "call") {
    const Nd1 = normCdf(d1);
    const Nd2 = normCdf(d2);
    return {
      price: S * Nd1 - K * disc * Nd2,
      delta: Nd1,
      gamma,
      vega,
      theta: (-(S * pdf * sigma) / (2 * sqrtT) - r * K * disc * Nd2) / 365,
      rho: (K * T * disc * Nd2) / 100,
      d1,
      d2
    };
  }
  const Nmd1 = normCdf(-d1);
  const Nmd2 = normCdf(-d2);
  return {
    price: K * disc * Nmd2 - S * Nmd1,
    delta: normCdf(d1) - 1,
    gamma,
    vega,
    theta: (-(S * pdf * sigma) / (2 * sqrtT) + r * K * disc * Nmd2) / 365,
    rho: (-K * T * disc * Nmd2) / 100,
    d1,
    d2
  };
}

/** Implied volatility by bisection; returns null when no vol reproduces the price. */
export function impliedVol(kind: Kind, target: number, S: number, K: number, T: number, r: number): number | null {
  let lo = 1e-4;
  let hi = 5;
  const f = (s: number) => priceAndGreeks(kind, S, K, T, r, s).price - target;
  if (f(lo) > 0 || f(hi) < 0) return null;
  for (let i = 0; i < 100; i++) {
    const mid = 0.5 * (lo + hi);
    if (f(mid) > 0) hi = mid;
    else lo = mid;
    if (hi - lo < 1e-6) break;
  }
  return 0.5 * (lo + hi);
}
