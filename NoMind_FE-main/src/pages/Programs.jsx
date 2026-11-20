import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import ScienceOfAwakening from '../components/workshops/ScienceOfAwakening';
import SacredSchedules from '../components/workshops/SacredSchedules';
import Testimonials from '../components/workshops/Testimonials';
import { fetchPublicPrograms, submitEnrollment } from '../modules/public/api/publicApi';

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery = '' } = useOutletContext() || {};

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        // Fetch only the top 3 programs for the featured section
        const result = await fetchPublicPrograms(0, 3);
        if (result && result.content) {
          setPrograms(result.content);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPrograms();
  }, []);

  const filteredPrograms = programs.filter(program => 
    program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (program.level && program.level.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <SacredSchedules programs={filteredPrograms} loading={loading} onEnroll={submitEnrollment} />
      <ScienceOfAwakening />
      <Testimonials />
    </>
  );
}
