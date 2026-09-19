import { lazy, Suspense } from "react";
import { I18nProvider } from "@/i18n/I18nContext";
import { Layout } from "@/components/Layout";
import { LazyMount } from "@/components/LazyMount";
import { HeroSection } from "@/components/HeroSection";
import { Analytics } from "@vercel/analytics/react";

// Seções abaixo da dobra são carregadas sob demanda (code-splitting),
// reduzindo o bundle crítico da primeira renderização.
const AboutSection = lazy(() =>
  import("@/components/AboutSection").then((m) => ({ default: m.AboutSection })),
);
const ImpactSection = lazy(() =>
  import("@/components/ImpactSection").then((m) => ({ default: m.ImpactSection })),
);
const ExperienceSection = lazy(() =>
  import("@/components/ExperienceSection").then((m) => ({ default: m.ExperienceSection })),
);
const SkillsSection = lazy(() =>
  import("@/components/SkillsSection").then((m) => ({ default: m.SkillsSection })),
);
const CaseStudySection = lazy(() =>
  import("@/components/CaseStudySection").then((m) => ({ default: m.CaseStudySection })),
);
const ContactSection = lazy(() =>
  import("@/components/ContactSection").then((m) => ({ default: m.ContactSection })),
);
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

const App = () => (
  <I18nProvider>
    <>
      <Layout>
        <HeroSection />
        <Suspense fallback={null}>
          <LazyMount>
            <AboutSection />
          </LazyMount>
          <LazyMount>
            <ImpactSection />
          </LazyMount>
          <LazyMount>
            <ExperienceSection />
          </LazyMount>
          <LazyMount>
            <SkillsSection />
          </LazyMount>
          <LazyMount>
            <CaseStudySection />
          </LazyMount>
          <LazyMount>
            <ContactSection />
          </LazyMount>
          <LazyMount>
            <Footer />
          </LazyMount>
        </Suspense>
      </Layout>
      <Analytics />
    </>
  </I18nProvider>
);

export default App;