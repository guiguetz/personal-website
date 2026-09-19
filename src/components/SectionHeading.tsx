import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  title: string;
  description?: string;
}

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <p className="text-sm font-medium text-primary mb-2">
        <span className="font-mono text-muted-foreground">{number}.</span> {title}
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
      {description && <p className="text-muted-foreground max-w-2xl">{description}</p>}
    </motion.div>
  );
}