import HeroSection from '../components/meditation/HeroSection';
import GuidedJourneys from '../components/meditation/GuidedJourneys';
import PersonalizedPractices from '../components/meditation/PersonalizedPractices';

export default function Meditation() {
  const searchQuery = '';

  return (
    <>
      <HeroSection />
      <GuidedJourneys />
      <PersonalizedPractices searchQuery={searchQuery} />
    </>
  );
}
