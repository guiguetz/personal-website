import { motion } from 'framer-motion';
import { TrendingUp, Users, UserCog, Timer } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { SectionHeading } from './SectionHeading';
import { useStagger } from '@/hooks/useStagger';
import { useI18n } from '@/i18n/I18nContext';

const metricVisuals = [
  { icon: TrendingUp, color: '#6366f1', data: [18, 24, 22, 32, 30, 42, 48, 60, 58, 74, 82, 95] },
  { icon: Users, color: '#22d3ee', data: [30, 34, 40, 38, 52, 58, 56, 68, 72, 78, 86, 92] },
  { icon: UserCog, color: '#a855f7', data: [10, 18, 16, 26, 34, 32, 44, 52, 50, 62, 70, 78] },
  { icon: Timer, color: '#34d399', data: [95, 88, 90, 78, 70, 72, 58, 46, 40, 28, 20, 8] },
];

export function ImpactSection() {
  const { t } = useI18n();
  const { container, item, viewport } = useStagger(0.09, 20);

  return (
    <section id="impact" className="mb-20">
      <SectionHeading number="02" title={t.impact.title} description={t.impact.description} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-4 sm:grid-cols-2"
      >
        {t.impact.metrics.map((metric, index) => {
          const visual = metricVisuals[index] ?? metricVisuals[0];
          const Icon = visual.icon;
          const gradientId = `spark-${index}`;
          return (
            <motion.div
              key={metric.label}
              variants={item}
              className="panel panel-interactive group relative overflow-hidden rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: visual.color }} />
                <span className="truncate">{metric.label}</span>
              </div>
              <p className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                {metric.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.note}</p>

              <div className="mt-4 h-14 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visual.data.map((v, i) => ({ i, v }))}>
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={visual.color} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={visual.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={visual.color}
                      strokeWidth={2}
                      fill={`url(#${gradientId})`}
                      isAnimationActive
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}