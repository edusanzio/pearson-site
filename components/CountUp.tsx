'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  end: number;
  start?: number;
  duration?: number;    // ms
  prefix?: string;
  suffix?: string;
  className?: string;
  once?: boolean;       // conta só uma vez
};

export default function CountUp({
  end,
  start = 0,
  duration = 6000,
  prefix = '',
  suffix = '',
  className,
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(start);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = () => {
      if (startedRef.current && once) return;
      startedRef.current = true;

      if (prefersReduced) { setVal(end); return; }

      const t0 = performance.now();
      const anim = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setVal(Math.floor(start + (end - start) * eased));
        if (p < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    };

    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) run(); }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, start, duration, once]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
}
