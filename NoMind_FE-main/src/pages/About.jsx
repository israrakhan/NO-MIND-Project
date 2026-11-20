import React, { useState, useEffect } from 'react';
import FounderSection from '../components/about/FounderSection';
import CorePillars from '../components/about/CorePillars';
import SanctuaryTimeline from '../components/about/SanctuaryTimeline';
import { fetchPublicMilestones } from '../modules/public/api/publicApi';

export default function About() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMilestones = async () => {
      try {
        const data = await fetchPublicMilestones();
        if (data && data.length > 0) {
          // Map backend experience data to match timeline format
          const mapped = data
            .map(item => ({
              year: item.year || item.period || '',
              title: item.title,
              description: item.description,
              order: item.order || 0
            }))
            .sort((a, b) => a.order - b.order);
          setMilestones(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch milestones:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMilestones();
  }, []);

  return (
    <>
      <FounderSection />
      <CorePillars />
      <SanctuaryTimeline customMilestones={milestones} loading={loading} />
    </>
  );
}
