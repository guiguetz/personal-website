import { motion } from 'framer-motion';
import {
  Code2,
  Atom,
  Layers,
  Braces,
  Palette,
  Wind,
  TestTube2,
  FlaskConical,
  Server,
  Database,
  Terminal,
  GitBranch,
  Users,
  Crown,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const categories = [
  {
    category: 'Frontend',
    categoryIcon: Code2,
    main: 'React',
    mainIcon: Atom,
    items: ['React Native', 'Next.js', 'TypeScript', 'JavaScript', 'Angular', 'HTML5', 'CSS3'],
  },
  {
    category: 'Gerenciamento de Estado',
    categoryIcon: Layers,
    main: 'Redux',
    mainIcon: Braces,
    items: ['Redux Saga', 'Redux Thunk', 'Context API'],
  },
  {
    category: 'UI & Design Systems',
    categoryIcon: Palette,
    main: 'Tailwind CSS',
    mainIcon: Wind,
    items: ['Styled Components', 'Framer Motion', 'Material UI', 'Design Systems', 'Figma'],
  },
  {
    category: 'Testes',
    categoryIcon: TestTube2,
    main: 'Jest',
    mainIcon: FlaskConical,
    items: ['React Testing Library', 'Cypress'],
  },
  {
    category: 'Backend & Dados',
    categoryIcon: Server,
    main: 'Node.js',
    mainIcon: Database,
    items: ['GraphQL', 'Firebase', 'MongoDB'],
  },
  {
    category: 'DevOps & Ferramentas',
    categoryIcon: Terminal,
    main: 'Git',
    mainIcon: GitBranch,
    items: ['Azure DevOps', 'Docker', 'Linux/Unix', 'Vite', 'Lerna', 'Nx', 'TurboRepo'],
  },
  {
    category: 'Liderança',
    categoryIcon: Users,
    main: 'Mentoria Técnica',
    mainIcon: Crown,
    items: ['Arquitetura Front-end', 'Code Review', 'Agile/Scrum'],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="mb-20">
      <SectionHeading
        number="04"
        title="Competências técnicas"
        description="Tecnologias que domino, agrupadas por área de atuação."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat, index) => {
          const CategoryIcon = cat.categoryIcon;
          const MainIcon = cat.mainIcon;
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="card-hover group relative overflow-hidden rounded-2xl border border-border bg-card p-5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Category header */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
                  <CategoryIcon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold">{cat.category}</h3>
              </div>

              {/* Main highlight */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30">
                  <MainIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">{cat.main}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">
                    Principal
                  </p>
                </div>
              </div>

              {/* Secondary items */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}