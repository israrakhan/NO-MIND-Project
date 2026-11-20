import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { deleteProgram, fetchPrograms } from "../../api/programsApi";
import { API_BASE_URL } from "../../../../api/httpClient";
import { toast } from "sonner";
import { BookOpen, Plus, Sparkles } from "lucide-react";
import { isValidTitle } from "./ProgramCreate";
import { useAdminSearch } from "../../context/AdminSearchContext.jsx";

const PAGE_SIZE = 6;

export function ProgramList() {
  const { globalSearchQuery } = useAdminSearch();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
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
      await deleteProgram(id);
      setPrograms((prev) => prev.filter((p) => String(p.id) !== String(id)));
      toast.success("Workshop deleted successfully");
    } catch (err) {
      const message = err?.message || "Failed to delete workshop";
      setError(message);
      toast.error(message);
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPrograms(0, 2000);
      setPrograms(result.content || []);
    } catch (err) {
      setError(err?.message || "Failed to load programs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getImageSrc = (image) => {
    if (!image) return null;
    if (image.startsWith("http://") || image.startsWith("https://"))
      return image;
    const path = image.startsWith("/") ? image : `/${image}`;
    return `${API_BASE_URL}${path}`;
  };

  const filteredPrograms = programs.filter((p) => {
    if (!globalSearchQuery.trim()) return true;
    const q = globalSearchQuery.toLowerCase();
    const titleMatch = (p.title || "").toLowerCase().includes(q);
    const descMatch = (p.description || "").toLowerCase().includes(q);
    const levelMatch = (p.level || "").toLowerCase().includes(q);
    const durationMatch = (p.duration || "").toLowerCase().includes(q);
    const locationMatch = (p.location || "").toLowerCase().includes(q);
    const idMatch = String(p.id || "").includes(q);
    return titleMatch || descMatch || levelMatch || durationMatch || locationMatch || idMatch;
  });

  const totalPages = Math.ceil(filteredPrograms.length / PAGE_SIZE) || 1;
  const paginatedPrograms = filteredPrograms.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#4A362D]">Workshops</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage Workshop cards shown on the website
          </p>
        </div>
        <Link
          to="/admin/programs/create"
          className="bg-[#BC6034] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#A35429] transition-colors whitespace-nowrap shadow-sm"
        >
          + New Workshop
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">
          Loading workshops...
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-500 font-medium mb-2">
            Failed to load workshops
          </p>
          <p className="text-sm text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => load(0)}
            className="px-4 py-2 bg-[#BC6034] text-white rounded-lg text-sm hover:bg-[#A35429] transition-colors"
          >
            Retry
          </button>
        </div>
      ) : programs.length === 0 ? (
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
                <span>Program Management</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#4A362D] tracking-tight leading-tight">
                No Workshops Created Yet
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                Craft engaging workshops and meditation programs for your community. Once created, your workshop cards will automatically display here and live on the public portal for visitor enrollment.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/admin/programs/create"
                  className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#BC6034] to-[#A35429] hover:from-[#A35429] hover:to-[#8C431F] text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg shadow-[#BC6034]/25 hover:shadow-xl hover:shadow-[#BC6034]/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create First Workshop</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Feature Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Public Website Display</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Showcase workshop titles, pricing, images, and descriptions directly to visitors.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Instant Enrollment Linking</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Visitors can click "Enroll Now" to submit applications linked to specific workshops.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Easy Program Updates</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Update course details, dates, or remove completed programs anytime.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : filteredPrograms.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <h3 className="text-lg font-bold text-[#4A362D]">No workshops found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">No workshop matching "{globalSearchQuery}" was found</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src={
                      getImageSrc(program.image) ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={program.title}
                    className={`w-full h-44 object-cover ${program.eventStatus === 'INACTIVE' ? 'grayscale opacity-75' : ''}`}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x200?text=No+Image";
                    }}
                  />
                  {program.eventStatus === 'INACTIVE' && (
                    <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-lg border border-white/20">
                      Inactive
                    </div>
                  )}
                </div>
                <div className={`p-5 flex flex-col flex-1 ${program.eventStatus === 'INACTIVE' ? 'bg-gray-50/50' : ''}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2 className={`font-semibold text-base leading-snug break-words break-all ${!isValidTitle(program.title) ? 'line-through text-red-500' : program.eventStatus === 'INACTIVE' ? 'text-gray-400' : 'text-[#4A362D]'}`}>
                      {program.title}
                    </h2>
                    {!isValidTitle(program.title) && (
                      <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-full border border-red-200 uppercase tracking-wider">
                        Invalid Title
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-[#EEDCC8] text-[#4A362D] rounded-full">
                      {program.duration}
                    </span>
                    <span className="text-xs px-2 py-1 bg-[#EEDCC8] text-[#4A362D] rounded-full">
                      {program.level}
                    </span>
                    {program.date && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        📅 {new Date(program.date).toLocaleDateString()}
                      </span>
                    )}
                    {program.location && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        📍 {program.location}
                      </span>
                    )}
                    {program.eventStatus && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        program.eventStatus === 'ACTIVE' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {program.eventStatus}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed line-clamp-3 flex-1 ${program.eventStatus === 'INACTIVE' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {program.description}
                  </p>
                  {program.highlights && program.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {program.highlights.slice(0, 2).map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 bg-[#BC6034] rounded-full mt-1 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                      {program.highlights.length > 2 && (
                        <li className="text-xs text-gray-400">
                          +{program.highlights.length - 2} more highlights
                        </li>
                      )}
                    </ul>
                  )}
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/programs/${program.id}/edit`}
                        className="flex-1 text-center py-2 text-sm bg-[#BC6034] hover:bg-[#A5522B] text-white rounded-lg transition-colors font-bold shadow-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => confirmDelete(program.id)}
                        className="flex-1 py-2 text-sm bg-white border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-bold shadow-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                    <Link
                      to={`/admin/enrollments?programId=${program.id}`}
                      className="text-center py-2 text-sm bg-white border border-[#D8B49F] text-[#BC6034] rounded-lg hover:bg-[#F6E4D5]/30 transition-all font-bold shadow-sm"
                    >
                      View Members
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-[#D8B49F] text-[#BC6034] bg-white hover:bg-[#F6E4D5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer"
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
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page + 1 >= totalPages}
                className="px-4 py-1.5 text-sm font-medium rounded-lg border border-[#D8B49F] text-[#BC6034] bg-white hover:bg-[#F6E4D5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer"
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
              Are you sure you want to permanently delete this workshop? This action cannot be undone.
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
