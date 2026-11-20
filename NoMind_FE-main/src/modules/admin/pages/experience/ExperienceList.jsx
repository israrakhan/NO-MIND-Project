import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { deleteMilestone, fetchMilestones } from '../../api/experienceApi';
import { toast } from 'sonner';
import { Sparkles, TrendingUp, Award, Star, Plus } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useAdminSearch } from '../../context/AdminSearchContext.jsx';

const PAGE_SIZE = 6;

export function ExperienceList() {
  const { globalSearchQuery } = useAdminSearch();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });
  const [jumpInput, setJumpInput] = useState("");

  useEffect(() => {
    setPage(0);
  }, [globalSearchQuery]);

  const handleJump = (e) => {
    e.preventDefault();
    const p = parseInt(jumpInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      setPage(p - 1);
    }
    setJumpInput("");
  };

  const confirmDelete = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async () => {
    const id = deleteConfirm.id;
    if (!id) return;
    try {
      await deleteMilestone(id);
      setMilestones((prev) => {
        const updated = prev.filter((milestone) => String(milestone.id) !== String(id));
        const newTotalPages = Math.ceil(updated.length / PAGE_SIZE) || 1;
        if (page >= newTotalPages) {
          setPage(Math.max(0, newTotalPages - 1));
        }
        return updated;
      });
      toast.success('Milestone deleted successfully');
    } catch (err) {
      const message = err?.message || 'Failed to delete milestone';
      toast.error(message);
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMilestones();
        setMilestones(data);
      } catch {
        // leave list empty on error
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filter milestones by globalSearchQuery (title, description, year)
  const filteredMilestones = milestones.filter((m) => {
    if (!globalSearchQuery.trim()) return true;
    const query = globalSearchQuery.toLowerCase();
    const titleMatch = (m.title || "").toLowerCase().includes(query);
    const descMatch = (m.description || "").toLowerCase().includes(query);
    const yearMatch = String(m.year || "").toLowerCase().includes(query);
    return titleMatch || descMatch || yearMatch;
  });

  const sorted = [...filteredMilestones].sort((a, b) => (a.order || 0) - (b.order || 0));
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE) || 1;
  const paginatedMilestones = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#4A362D]">About — Sanctuary Timeline</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage the timeline milestones on the About page</p>
        </div>
        <Link
          to="/admin/experience/create"
          className="bg-[#BC6034] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#A35429] transition-colors whitespace-nowrap shadow-sm"
        >
          + New Milestone
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading milestones...</div>
      ) : milestones.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-[#FFF8F3] via-white to-[#FDF7F2] rounded-3xl border border-[#EEDCC8]/70 p-8 md:p-12 w-full my-6 shadow-xl shadow-[#BC6034]/5 overflow-hidden"
        >
          {/* Ambient Background Glows */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F6E4D5]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#EEDCC8]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEDCC8]/60 text-[#BC6034] text-xs font-bold uppercase tracking-wider border border-[#D8B49F]/30 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About & Experience</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#4A362D] tracking-tight leading-tight">
                No Milestones Created Yet
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                Highlight your foundation's journey, achievements, and key organization milestones. Showcase your impact, years of experience, and community outreach.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/admin/experience/create"
                  className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#BC6034] to-[#A35429] hover:from-[#A35429] hover:to-[#8C431F] text-[#BC6034] hover:text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg shadow-[#BC6034]/25 hover:shadow-xl hover:shadow-[#BC6034]/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-white"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Add First Milestone</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Feature Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Timeline Journey</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Display chronological achievements and foundation growth stories.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Accreditation & Badges</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Share recognitions, certifications, and organizational statistics.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Public Website Placement</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Milestones are prominently featured on the public About page.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <h3 className="text-lg font-bold text-[#4A362D]">No milestones found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">No timeline milestones match your search "{globalSearchQuery}"</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedMilestones.map((milestone, index) => (
              <Link
                to={`/admin/experience/${milestone.id}`}
                key={milestone.id}
                className="bg-white rounded-xl border border-[#BC6034] shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all block"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-[#BC6034]/10 rounded-full flex items-center justify-center text-[#BC6034] font-bold text-sm shadow-sm">
                      {milestone.order || (page * PAGE_SIZE) + index + 1}
                    </div>
                    <span className="font-headline-sm text-lg font-bold text-[#BC6034]">
                      {milestone.year}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-bold">{milestone.title}</h3>
                  <p className="font-body-md text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">{milestone.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center text-xs font-label-caps uppercase tracking-wider text-gray-500">
                    <span className="mr-1.5">Icon:</span>
                    {milestone.icon && LucideIcons[milestone.icon] ? (
                      (() => {
                        const Icon = LucideIcons[milestone.icon];
                        return <Icon className="w-4 h-4 text-[#BC6034] ml-1" />;
                      })()
                    ) : (
                      '—'
                    )}
                  </div>
                  <div className="flex items-center gap-2 relative z-10">
                    <Link
                      to={`/admin/experience/${milestone.id}/edit`}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[#BC6034] text-white hover:bg-[#A35429] px-3.5 py-1.5 rounded-lg text-xs font-label-caps uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        confirmDelete(milestone.id);
                      }}
                      className="bg-white border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 px-3.5 py-1.5 rounded-lg text-xs font-label-caps uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-[#D8B49F] text-[#BC6034] bg-white hover:bg-[#F6E4D5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Previous
              </button>
              
              <form onSubmit={handleJump} className="flex items-center gap-2 mx-2">
                <span className="text-sm text-gray-500 font-medium">Page</span>
                <input 
                  type="number" 
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  placeholder={page + 1}
                  min={1}
                  max={totalPages}
                  className="w-16 px-2 py-1.5 text-center text-sm font-bold border border-[#D8B49F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC6034]/30 shadow-sm appearance-none"
                />
                <span className="text-sm text-gray-500 font-medium">of {totalPages}</span>
                <button type="submit" className="hidden">Go</button>
              </form>
    
              <button
                onClick={() => setPage(page + 1)}
                disabled={page + 1 >= totalPages}
                className="px-4 py-1.5 text-sm font-medium rounded-lg border border-[#D8B49F] text-[#BC6034] bg-white hover:bg-[#F6E4D5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A362D]/40 backdrop-blur-sm">
          <div className="bg-[#FFF8F3] rounded-2xl p-7 max-w-sm w-full shadow-2xl border border-[#EEDCC8]">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-100 mb-5 mx-auto shadow-sm">
              <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#4A362D] text-center mb-2">Confirm Deletion</h3>
            <p className="text-sm font-medium text-gray-600 text-center mb-8 leading-relaxed">
              Are you sure you want to permanently delete this milestone? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm({ isOpen: false, id: null })}
                className="flex-1 px-4 py-2.5 bg-white border border-[#D8B49F] text-[#BC6034] rounded-xl text-sm font-bold hover:bg-[#F6E4D5] transition-all cursor-pointer shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all shadow-sm shadow-red-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
