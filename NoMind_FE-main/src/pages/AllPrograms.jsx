import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { fetchPublicPrograms } from '../modules/public/api/publicApi';
import { API_BASE_URL } from '../api/httpClient';
import EnrollModal from '../components/workshops/EnrollModal';
import ProgramDetailsModal from '../components/workshops/ProgramDetailsModal';

const getImageSrc = (image) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  const path = image.startsWith("/") ? image : `/${image}`;
  return `${API_BASE_URL}${path}`;
};

export default function AllPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [enrollTarget, setEnrollTarget] = useState(null);
  const [detailsTarget, setDetailsTarget] = useState(null);

  const loadPrograms = async (pageToLoad) => {
    try {
      setLoading(true);
      const result = await fetchPublicPrograms(pageToLoad, 9); // Load 9 programs per page

      if (result && result.content) {
        setPrograms(result.content);
        setTotalPages(result.totalPages || 1);
        setPage(result.currentPage || pageToLoad);
      }
    } catch (error) {
      console.error("Failed to fetch programs:", error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    loadPrograms(0);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      loadPrograms(newPage);
    }
  };

  const handleEnroll = (program) => {
    setEnrollTarget(program);
  };

  // Generate page numbers for pagination
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(0, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${page === i
              ? 'bg-secondary text-white shadow-md'
              : 'text-on-surface hover:bg-surface-tan border border-outline-variant/30'
            }`}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div className="mt-16 flex items-center justify-center gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-tan border border-outline-variant/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        {startPage > 0 && (
          <>
            <button
              onClick={() => handlePageChange(0)}
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-on-surface hover:bg-surface-tan border border-outline-variant/30 transition-colors"
            >
              1
            </button>
            {startPage > 1 && <span className="px-1 text-outline-variant">...</span>}
          </>
        )}

        {pages}

        {endPage < totalPages - 1 && (
          <>
            {endPage < totalPages - 2 && <span className="px-1 text-outline-variant">...</span>}
            <button
              onClick={() => handlePageChange(totalPages - 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-on-surface hover:bg-surface-tan border border-outline-variant/30 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-tan border border-outline-variant/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    );
  };

  return (
    <div className="bg-surface min-h-screen pt-12 pb-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-widest font-semibold">
            Complete Catalog
          </span>
          <h1 className="font-display-lg text-4xl md:text-5xl text-primary font-bold mb-6">
            All Programs
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
            Explore our full range of workshops, retreats, and guided experiences designed to elevate your journey.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-secondary py-24 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mb-4"></div>
            <p className="font-label-caps font-bold tracking-widest">Loading Programs...</p>
          </div>
        ) : programs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {programs.map((program, idx) => (
                <div 
                  key={program.id || idx} 
                  onClick={() => setDetailsTarget(program)}
                  className="group relative overflow-hidden rounded-2xl bg-primary p-6 md:p-8 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[250px]"
                >
                  <div className="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-[800ms] select-none">
                    <img 
                      alt={program.title}
                      className="w-full h-full object-cover opacity-45" 
                      src={getImageSrc(program.image) || "https://images.unsplash.com/photo-1669676648180-cb9db2aae514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="font-label-caps text-[10px] text-petal-pink mb-3 uppercase font-bold tracking-wider">{program.level || 'Workshop'}</p>
                    <h4 className="font-headline-sm text-headline-sm text-white mb-3 text-xl font-bold group-hover:text-petal-pink transition-colors">
                      {program.title}
                    </h4>
                    <p className="font-body-md text-white/80 text-sm mb-6 leading-relaxed">
                      {program.description.length > 120 ? (
                        <>
                          {program.description.slice(0, 120)}...{' '}
                          <span className="text-petal-pink hover:underline font-bold text-xs ml-1 whitespace-nowrap">
                            Read More
                          </span>
                        </>
                      ) : (
                        program.description
                      )}
                    </p>
                  </div>
                  <div className="relative z-10 flex justify-between items-center border-t border-white/10 pt-5 mt-auto">
                    <span className="font-body-md font-bold text-white text-lg">{program.price ? `$${program.price}` : 'Enquire'}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEnroll(program); }}
                      className="text-petal-pink hover:text-white font-label-caps text-label-caps flex items-center gap-1 hover:gap-2 transition-all font-bold cursor-pointer select-none"
                    >
                      ENROLL <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {renderPagination()}
          </>
        ) : (
          <div className="text-center text-on-surface-variant py-24 bg-surface-tan rounded-3xl">
            <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">calendar_month</span>
            <p className="text-lg">No programs available at the moment.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {enrollTarget && (
          <EnrollModal
            program={enrollTarget}
            onClose={() => setEnrollTarget(null)}
          />
        )}
        {detailsTarget && (
          <ProgramDetailsModal
            program={detailsTarget}
            onClose={() => setDetailsTarget(null)}
            onEnroll={handleEnroll}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
