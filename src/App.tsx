import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "@/i18n/I18nContext";
import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ImpactSection } from "@/components/ImpactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { CaseStudySection } from "@/components/CaseStudySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Layout>
          <HeroSection />
          <AboutSection />
          <ImpactSection />
          <ExperienceSection />
          <SkillsSection />
          <CaseStudySection />
          <ContactSection />
          <Footer />
        </Layout>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;