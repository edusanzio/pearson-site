// lib/weeklyGrowth.ts
export type GrowthConfig = {
  base: number;            // número base de partida (ex.: 432)
  startDate: string;       // data de referência (YYYY-MM-DD), uma segunda é ideal
  weeklyRatePct: number;   // taxa semanal em %, ex.: 2 = 2%/semana
  roundTo?: number;        // arredonda para múltiplos (1, 5, 10, 25...), default=1
  cap?: number;            // teto opcional (não passa disso)
};

/** Retorna quantas semanas completas se passaram entre as segundas do start e do now. */
function mondaysSince(start: Date, now: Date) {
  const toMonday = (d: Date) => {
    const day = d.getDay();            // 0=Dom, 1=Seg, ... 6=Sáb
    const diff = (day + 6) % 7;        // dias desde segunda
    const m = new Date(d);
    m.setHours(0, 0, 0, 0);
    m.setDate(m.getDate() - diff);
    return m;
  };
  const msWeek = 7 * 24 * 60 * 60 * 1000;
  const a = toMonday(start).getTime();
  const b = toMonday(now).getTime();
  return Math.max(0, Math.floor((b - a) / msWeek));
}

/** Crescimento composto semanal, aplicado apenas nas segundas. */
export function computeWeeklyGrowth(
  cfg: GrowthConfig,
  now: Date = new Date()
): number {
  const { base, startDate, weeklyRatePct, roundTo = 1, cap } = cfg;
  const start = new Date(`${startDate}T00:00:00`);
  const weeks = mondaysSince(start, now);
  const factor = Math.pow(1 + weeklyRatePct / 100, weeks);
  let value = base * factor;

  if (cap != null) value = Math.min(value, cap);
  if (roundTo > 1) value = Math.round(value / roundTo) * roundTo;

  // número inteiro “limpo”
  return Math.floor(value);
}

/** Ex: "3.867" no pt-BR */
export function formatPtBR(n: number) {
  return n.toLocaleString('pt-BR');
}


export type FixedGrowthConfig = {
  base: number;       // valor inicial (ex.: 432)
  startDate: string;  // YYYY-MM-DD (uma segunda é ideal)
  perWeek: number;    // incremento fixo por semana (ex.: 2)
  roundTo?: number;   // múltiplo para arredondar (opcional)
};

export function computeWeeklyFixedIncrement(
  cfg: FixedGrowthConfig,
  now: Date = new Date()
): number {
  const { base, startDate, perWeek, roundTo = 1 } = cfg;
  const start = new Date(`${startDate}T00:00:00`);
  const weeks = (function mondaysSince(start: Date, now: Date) {
    const toMonday = (d: Date) => {
      const day = d.getDay(); // 0=Dom, 1=Seg, ...
      const diff = (day + 6) % 7; // dias desde segunda
      const m = new Date(d);
      m.setHours(0, 0, 0, 0);
      m.setDate(m.getDate() - diff);
      return m;
    };
    const msWeek = 7 * 24 * 60 * 60 * 1000;
    const a = toMonday(start).getTime();
    const b = toMonday(now).getTime();
    return Math.max(0, Math.floor((b - a) / msWeek));
  })(start, now);

  let value = base + perWeek * weeks;
  if (roundTo > 1) value = Math.round(value / roundTo) * roundTo;
  return Math.floor(value);
}