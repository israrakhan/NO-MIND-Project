import React from 'react';
import LandingHero from '../components/landing/LandingHero';
import LandingCourses from '../components/landing/LandingCourses';
import LandingWisdom from '../components/landing/LandingWisdom';
import LandingRetreats from '../components/landing/LandingRetreats';
import LandingPhilosophy from '../components/landing/LandingPhilosophy';
import LandingReels from '../components/landing/LandingReels';

export default function Home() {
  return (
    <>
      <LandingHero />
      <LandingCourses />
      <LandingWisdom />
      <LandingRetreats />
      <LandingPhilosophy />
      <LandingReels />
    </>
  );
}
