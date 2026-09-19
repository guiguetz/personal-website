import { motion } from 'framer-motion';
import { TrendingUp, Users, UserCog, Timer } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { SectionHeading } from './SectionHeading';

const metrics = [
  {
    icon: TrendingUp,
    label: 'Originação anual',
    value: 'R$ 1,57 bi+',
    note: 'Consignado Privado CLT',
    color: '#6366f1',
    data: [18, 24, 22, 32, 30, 42, 48, 60, 58, 74, 82, 95],
  },
  {
    icon: Users,
    label: 'Usuários impactados',
    value: '900 mil+',
    note: 'Setor financeiro',
    color: '#22d3ee',
    data: [30, 34, 40, 38, 52, 58, 56, 68, 72, 78, 86, 92],
  },
  {
    icon: UserCog,
    label: 'Equipe liderada',
    value: '6 devs',
    note: 'Liderança técnica e mentoria',
    color: '#a855f7',
    data: [10, 18, 16, 26, 34, 32, 44, 52, 50, 62, 70, 78],
  },
  {
    icon: Timer,
    label: 'Tempo de rollout',
    value: '6 dias → min',
    note: 'Plataforma MCP + IA generativa',
    color: '#34d399',
    data: [95, 88, 90, 78, 70, 72, 58, 46, 40, 28, 20, 8],
  },
];

export function ImpactSection() {
  return (
    <section id="impact" className="mb-20">
      <SectionHeading
        number="02"
        title="Impacto em números"
        description="Resultados mensuráveis dos produtos que desenvolvi e liderei."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const gradientId = `spark-${index}`;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="card-hover group relative overflow-hidden rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" style={{ color: metric.color }} />
                    {metric.label}
                  </div>
                  <p className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{metric.note}</p>
                </div>
              </div>

              <div className="mt-4 h-14 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metric.data.map((v, i) => ({ i, v }))}>
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={metric.color} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={metric.color}
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
      </div>
    </section>
  );
}