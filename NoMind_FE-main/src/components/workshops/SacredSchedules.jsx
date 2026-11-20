import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { fetchPublicPrograms } from '../../modules/public/api/publicApi.js';
import { API_BASE_URL } from '../../api/httpClient.js';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { isSameDay } from 'date-fns';
import { useNavigate } from 'react-router';
import EnrollModal from './EnrollModal';
import ProgramDetailsModal from './ProgramDetailsModal';

const getImageSrc = (image) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  const path = image.startsWith("/") ? image : `/${image}`;
  return `${API_BASE_URL}${path}`;
};

function CalendarModal({ onClose, onEnroll }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        // Fetch up to 100 programs to display on the calendar
        const result = await fetchPublicPrograms(0, 100);
        if (result && result.content) {
          setAllPrograms(result.content);
        }
      } catch (error) {
        console.error("Failed to load calendar programs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const programDates = useMemo(() => {
    return allPrograms
      .filter((p) => p.date)
      .map((p) => new Date(p.date));
  }, [allPrograms]);

  const selectedPrograms = useMemo(() => {
    if (!selectedDate) return [];
    return allPrograms.filter((p) => p.date && isSameDay(new Date(p.date), selectedDate));
  }, [allPrograms, selectedDate]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-surface rounded-[2rem] shadow-2xl w-full max-w-4xl z-10 overflow-hidden border border-outline-variant/30 flex flex-col md:flex-row max-h-[85vh] md:max-h-none"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:right-6 text-primary hover:text-secondary transition-colors z-20 bg-surface-tan/50 p-1.5 rounded-full backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        <div className="bg-surface-tan/30 p-4 md:p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-outline-variant/30 flex flex-col items-center shrink-0">
          <div className="w-full mb-6">
            <h3 className="font-headline-sm text-primary text-xl font-bold flex items-center gap-2">
              <CalendarIcon size={22} className="text-secondary" />
              Program Calendar
            </h3>
            <p className="text-sm text-on-surface-variant mt-1">Select a highlighted date to view available programs.</p>
          </div>
          
          <div className="bg-surface p-4 rounded-2xl shadow-sm border border-outline-variant/20 relative min-h-[300px] flex items-center justify-center">
            {loading && (
              <div className="absolute inset-0 bg-surface/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                <div className="w-8 h-8 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin"></div>
              </div>
            )}
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{ hasProgram: programDates }}
              modifiersStyles={{
                hasProgram: { fontWeight: 'bold', borderBottom: '2px solid #8b5e3c' },
                selected: { backgroundColor: '#8b5e3c', color: 'white', borderRadius: '100%' }
              }}
              className="font-body-md"
            />
          </div>
        </div>

        <div className="p-6 md:p-8 md:w-1/2 bg-surface max-h-[500px] overflow-y-auto custom-scrollbar" data-lenis-prevent>
          <h4 className="font-label-caps text-xs text-secondary mb-4 uppercase tracking-widest font-bold">
            {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}
          </h4>
          
          {selectedPrograms.length > 0 ? (
            <div className="space-y-4">
              {selectedPrograms.map((p, idx) => (
                <div key={idx} className="bg-surface-tan p-5 rounded-2xl border border-outline-variant/20 hover:border-secondary/30 transition-all group">
                  <span className="text-[10px] bg-secondary/10 text-secondary px-2.5 py-1 rounded-full font-label-caps font-bold uppercase mb-2 inline-block">
                    {p.level || 'Workshop'}
                  </span>
                  <h5 className="font-headline-sm text-primary font-bold text-lg mb-2">{p.title}</h5>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-xs text-on-surface-variant">
                    {p.duration && (
                      <span className="flex items-center gap-1"><Clock size={14} className="text-secondary/70"/> {p.duration}</span>
                    )}
                    {p.location && (
                      <span className="flex items-center gap-1"><MapPin size={14} className="text-secondary/70"/> {p.location}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      onClose();
                      onEnroll(p);
                    }}
                    className="w-full py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:bg-secondary transition-colors mt-2"
                  >
                    BOOK NOW
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
              <div className="w-12 h-12 bg-surface-tan rounded-full flex items-center justify-center mb-3">
                <CalendarIcon size={20} className="text-outline-variant" />
              </div>
              <p className="text-on-surface-variant text-sm">No programs scheduled on this date.</p>
              <p className="text-on-surface-variant text-xs mt-1">Try selecting a highlighted date.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function SacredSchedules({ programs = [], loading = false }) {
  const [enrollTarget, setEnrollTarget] = useState(null);
  const [detailsTarget, setDetailsTarget] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = (program) => {
    setEnrollTarget(program);
  };

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto relative" id="schedules">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 gap-4">
        <div>
          <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest font-semibold">
            Upcoming Sessions
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">Sacred Schedules</h2>
        </div>
        <button 
          onClick={() => setShowCalendar(true)}
          className="text-secondary font-label-caps text-label-caps tracking-wider hover:text-primary transition-all font-semibold text-left select-none"
        >
          VIEW FULL CALENDAR
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {loading ? (
          <div className="col-span-12 text-center text-secondary py-12">Loading programs...</div>
        ) : programs && programs.length > 0 ? (
          <>
            {/* First Program as Large Retreat Card */}
            <div 
              onClick={() => setDetailsTarget(programs[0])}
              className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-primary min-h-[440px] shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-[800ms] select-none">
                <img 
                  alt={programs[0].title}
                  className="w-full h-full object-cover opacity-60" 
                  src={getImageSrc(programs[0].image) || "https://images.unsplash.com/photo-1669676648180-cb9db2aae514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {programs[0].level && (
                    <span className="bg-petal-pink text-primary px-3.5 py-1 rounded-full font-label-caps text-[10px] font-bold uppercase">
                      {programs[0].level}
                    </span>
                  )}
                  {programs[0].duration && (
                    <span className="bg-white/20 backdrop-blur-md text-white px-3.5 py-1 rounded-full font-label-caps text-[10px] font-bold border border-white/10 uppercase">
                      {programs[0].duration}
                    </span>
                  )}
                </div>
                
                <h3 className="font-display-lg text-white mb-4 text-2xl md:text-4xl font-bold leading-tight">
                  {programs[0].title}
                </h3>
                
                <p className="text-white/80 max-w-lg mb-6 text-sm md:text-base leading-relaxed opacity-95">
                  {programs[0].description.length > 150 ? (
                    <>
                      {programs[0].description.slice(0, 150)}...{' '}
                      <span className="text-petal-pink hover:underline font-bold text-xs ml-1 whitespace-nowrap">
                        Read More
                      </span>
                    </>
                  ) : (
                    programs[0].description
                  )}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 border-t border-white/10 pt-6">
                  {programs[0].date && (
                    <div className="text-white">
                      <p className="font-label-caps text-[10px] opacity-60 font-semibold tracking-wider">DATE</p>
                      <p className="font-body-md font-semibold text-sm md:text-base mt-0.5">
                        {new Date(programs[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                  {programs[0].location && (
                    <div className="text-white">
                      <p className="font-label-caps text-[10px] opacity-60 font-semibold tracking-wider">LOCATION</p>
                      <p className="font-body-md font-semibold text-sm md:text-base mt-0.5">{programs[0].location}</p>
                    </div>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEnroll(programs[0]); }}
                    className="sm:ml-auto bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-white px-7 py-3 rounded-lg font-label-caps text-label-caps transition-all font-semibold active:scale-95 shadow-sm hover:shadow"
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-gutter">
              {programs.slice(1, 3).map((program, idx) => (
                <div 
                  key={program.id || idx} 
                  onClick={() => setDetailsTarget(program)}
                  className="group relative overflow-hidden rounded-2xl bg-primary p-6 md:p-8 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300 flex-1 cursor-pointer min-h-[210px]"
                >
                  <div className="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-[800ms] select-none">
                    <img 
                      alt={program.title}
                      className="w-full h-full object-cover opacity-40" 
                      src={getImageSrc(program.image) || "https://images.unsplash.com/photo-1669676648180-cb9db2aae514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="font-label-caps text-[10px] text-petal-pink mb-2 uppercase font-bold tracking-wider">{program.level || 'Workshop'}</p>
                    <h4 className="font-headline-sm text-headline-sm text-white mb-2 text-xl font-bold group-hover:text-petal-pink transition-colors">
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
                  <div className="relative z-10 flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
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
          </>
        ) : (
          <div className="col-span-12 text-center text-secondary py-12">No programs available at the moment.</div>
        )}
      </div>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => navigate('/workshops/all')} 
          className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-3.5 rounded-full font-label-caps font-bold tracking-wider transition-all"
        >
          VIEW ALL PROGRAMS
        </button>
      </div>

      <AnimatePresence>
        {enrollTarget && (
          <EnrollModal
            program={enrollTarget}
            onClose={() => setEnrollTarget(null)}
          />
        )}
        {showCalendar && (
          <CalendarModal
            programs={programs}
            onClose={() => setShowCalendar(false)}
            onEnroll={handleEnroll}
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
    </section>
  )
}
