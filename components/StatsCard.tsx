// components/StatsCards.tsx
import { computeWeeklyGrowth, formatPtBR, GrowthConfig } from '@/lib/weeklyGrowth';

type StatCard = {
  label: string;
  cfg: GrowthConfig;
};

export default async function StatsCards({
  left,
  right,
  showUpdatedNote = true,
  noteText = 'estimativa, atualizada às segundas',
}: {
  left: StatCard;          // card da esquerda
  right: StatCard;         // card da direita
  showUpdatedNote?: boolean;
  noteText?: string;
}) {
  // roda no server → valor estável por semana
  const now = new Date();
  const leftVal = computeWeeklyGrowth(left.cfg, now);
  const rightVal = computeWeeklyGrowth(right.cfg, now);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card value={leftVal} label={left.label} />
      <Card value={rightVal} label={right.label} />
      {showUpdatedNote && (
        <div className="col-span-full text-center text-xs text-white/60 mt-1">
          {noteText}
        </div>
      )}
    </div>
  );
}

function Card({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-3xl bg-slate-900/70 ring-1 ring-white/10 px-8 py-5 text-center backdrop-blur-sm">
      <div className="text-3xl font-semibold text-white tracking-tight">
        {formatPtBR(value)}
      </div>
      <div className="mt-1 text-sm text-white/80">{label}</div>
    </div>
  );
}
