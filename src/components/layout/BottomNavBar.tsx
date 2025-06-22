import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import MenuDisplay from '@/components/sections/MenuDisplay';
import RecommendationSection from '@/components/sections/RecommendationSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <RecommendationSection />
        <MenuDisplay />
      </main>
      <Footer />
    </div>
  );
}