import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { fetchInquiries, markInquiryRead, deleteInquiry, bulkMarkInquiriesRead, bulkDeleteInquiries } from "../../api/inquiriesApi";
import { toast } from "sonner";
import { MessageSquare, Sparkles, Mail, CheckCircle2, ShieldCheck } from "lucide-react";
import { useAdminSearch } from "../../context/AdminSearchContext.jsx";

const PAGE_SIZE = 9;

export function InquiryList() {
  const { globalSearchQuery } = useAdminSearch();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [selectedInquiries, setSelectedInquiries] = useState([]);
  const [filterRead, setFilterRead] = useState("");
  const [filterInterest, setFilterInterest] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, type: null, id: null });
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

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const readParam = filterRead === "" ? undefined : filterRead === "true";
      const result = await fetchInquiries({ 
        page: 0, 
        size: 2000,
        read: readParam,
        interest: filterInterest || undefined,
        date: filterDate || undefined
      });
      setInquiries(result.content || []);
    } catch (err) {
      setError(err?.message || "Failed to load inquiries. Please try again.");
    } finally {
      setLoading(false);
      setSelectedInquiries([]);
    }
  };

  useEffect(() => {
    load();
  }, [filterRead, filterInterest, filterDate]);

  const handleMarkRead = async (inquiryId) => {
    setLoadingId(inquiryId);
    try {
      await markInquiryRead(inquiryId);
      setInquiries((prev) =>
        prev.map((item) =>
          item.inquiryId === inquiryId ? { ...item, read: true } : item,
        ),
      );
      toast.success("Inquiry marked as read");
    } catch (err) {
      const message = err?.message || "Failed to mark as read";
      toast.error(message);
    } finally {
      setLoadingId(null);
    }
  };

  const executeDelete = async (inquiryId) => {
    try {
      await deleteInquiry(inquiryId);
      toast.success("Inquiry deleted successfully");
      if (inquiries.length <= 1 && page > 0) {
        load(page - 1);
      } else {
        load(page);
      }
    } catch (err) {
      const message = err?.message || "Failed to delete inquiry";
      toast.error(message);
    }
  };

  const handleSelectAll = () => {
    const isAllSelected = inquiries.length > 0 && selectedInquiries.length === inquiries.length;
    if (!isAllSelected) {
      setSelectedInquiries(inquiries.map(inq => inq.inquiryId));
    } else {
      setSelectedInquiries([]);
    }
  };

  const handleSelect = (inquiryId) => {
    setSelectedInquiries(prev => 
      prev.includes(inquiryId) 
        ? prev.filter(id => id !== inquiryId)
        : [...prev, inquiryId]
    );
  };

  const handleBulkMarkRead = async () => {
    const unreadIds = inquiries
      .filter(inq => selectedInquiries.includes(inq.inquiryId) && !inq.read)
      .map(inq => inq.inquiryId);
      
    if (unreadIds.length === 0) return;

    try {
      await bulkMarkInquiriesRead(unreadIds);
      setInquiries(inquiries.map(inq => 
        unreadIds.includes(inq.inquiryId) ? { ...inq, read: true } : inq
      ));
      setSelectedInquiries([]);
      toast.success("Inquiries marked as read");
    } catch (err) {
      toast.error("Failed to update inquiries");
    }
  };

  const executeBulkDelete = async () => {
    try {
      await bulkDeleteInquiries(selectedInquiries);
      toast.success("Inquiries deleted successfully");
      load(page);
      setSelectedInquiries([]);
    } catch (err) {
      toast.error("Failed to delete inquiries");
    }
  };

  const confirmDeleteAction = async () => {
    if (deleteConfirm.type === 'single') {
      await executeDelete(deleteConfirm.id);
    } else if (deleteConfirm.type === 'bulk') {
      await executeBulkDelete();
    }
    setDeleteConfirm({ isOpen: false, type: null, id: null });
  };

  const unreadSelectedCount = inquiries.filter(
    inq => selectedInquiries.includes(inq.inquiryId) && !inq.read
  ).length;

  const handleClearFilters = () => {
    setFilterRead("");
    setFilterInterest("");
    setFilterDate("");
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (!globalSearchQuery.trim()) return true;
    const q = globalSearchQuery.toLowerCase();
    const nameMatch = (inq.fullName || "").toLowerCase().includes(q);
    const emailMatch = (inq.email || "").toLowerCase().includes(q);
    const phoneMatch = String(inq.phone || "").toLowerCase().includes(q);
    const interestMatch = (inq.programInterest || "").toLowerCase().includes(q);
    const msgMatch = (inq.message || "").toLowerCase().includes(q);
    const idMatch = String(inq.inquiryId || "").includes(q);
    return nameMatch || emailMatch || phoneMatch || interestMatch || msgMatch || idMatch;
  });

  const totalPages = Math.ceil(filteredInquiries.length / PAGE_SIZE) || 1;
  const paginatedInquiries = filteredInquiries.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4A362D] mb-6">Inquiries</h1>

      {/* Action Bar (Filters & Bulk Actions) */}
      <div className="flex flex-col xl:flex-row gap-4 mb-6 items-center bg-[#FFF8F3] p-3 rounded-xl border border-[#EEDCC8] shadow-sm">
        
        {/* Left Side: Select All & Bulk Actions */}
        <div className="flex items-center gap-3 w-full xl:w-auto pb-3 xl:pb-0 border-b xl:border-b-0 xl:border-r border-[#D8B49F]/30 pr-0 xl:pr-4">
          <button
            onClick={handleSelectAll}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer border shadow-sm ${
              inquiries.length > 0 && selectedInquiries.length === inquiries.length
                ? 'bg-[#F6E4D5] border-[#D8B49F] text-[#BC6034]'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
              inquiries.length > 0 && selectedInquiries.length === inquiries.length
                ? 'bg-[#BC6034] border-[#BC6034]'
                : 'bg-white border-gray-300'
            }`}>
              {inquiries.length > 0 && selectedInquiries.length === inquiries.length && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            Select All
          </button>

          {selectedInquiries.length > 0 && (
            <div className="flex gap-2">
              {unreadSelectedCount > 0 && (
                <button 
                  onClick={handleBulkMarkRead}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#D8B49F] text-[#BC6034] rounded-lg text-sm font-bold hover:bg-[#F6E4D5] transition-all cursor-pointer shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Read ({unreadSelectedCount})
                </button>
              )}
              <button 
                onClick={() => setDeleteConfirm({ isOpen: true, type: 'bulk', id: null })}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-red-200 text-red-500 rounded-lg text-sm font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete ({selectedInquiries.length})
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Filters */}
        <div className="flex-1 w-full flex flex-col md:flex-row gap-3 items-center pl-0 xl:pl-2">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <svg className="w-5 h-5 text-[#BC6034]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm font-bold text-[#4A362D] hidden md:block whitespace-nowrap">Filter By:</span>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-white border border-[#D8B49F]/70 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BC6034]/30 focus:border-[#BC6034] transition-all cursor-pointer shadow-sm appearance-none truncate"
              style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23BC6034"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
            >
              <option value="">Status: All</option>
              <option value="false">Status: Unread</option>
              <option value="true">Status: Read</option>
            </select>

            <select
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-white border border-[#D8B49F]/70 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BC6034]/30 focus:border-[#BC6034] transition-all cursor-pointer shadow-sm appearance-none truncate"
              style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23BC6034"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
            >
              <option value="">Program: All</option>
              <option value="NLP Practitioner Certification">NLP Practitioner Certification</option>
              <option value="Mindfulness & Meditation Immersion">Mindfulness & Meditation Immersion</option>
              <option value="Leadership & Communication Mastery">Leadership & Communication Mastery</option>
              <option value="Youth Empowerment Workshop">Youth Empowerment Workshop</option>
              <option value="Custom Corporate Program">Custom Corporate Program</option>
              <option value="Other / General Inquiry">Other / General Inquiry</option>
            </select>

            <div className="relative">
              <input
                type={filterDate ? "date" : "text"}
                placeholder="Date: All"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!filterDate) e.target.type = "text";
                }}
                className="w-full px-3 py-2 bg-white border border-[#D8B49F]/70 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BC6034]/30 focus:border-[#BC6034] transition-all cursor-pointer shadow-sm"
                style={{ minHeight: '38px' }}
              />
            </div>
          </div>

          <button
            onClick={handleClearFilters}
            disabled={!filterRead && !filterInterest && !filterDate}
            className={`w-full md:w-auto px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm whitespace-nowrap border ${
              !filterRead && !filterInterest && !filterDate 
                ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-[#D8B49F] text-[#BC6034] hover:bg-[#F6E4D5] cursor-pointer'
            }`}
          >
            Clear
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading inquiries...</div>
      ) : inquiries.length === 0 ? (
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
                <span>Inquiry Management</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#4A362D] tracking-tight leading-tight">
                No Customer Inquiries Yet
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                Messages, course questions, and contact form submissions from visitors on your public website will land here automatically. Stay tuned for user contact requests.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/connect"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#BC6034] to-[#A35429] hover:from-[#A35429] hover:to-[#8C431F] text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg shadow-[#BC6034]/25 hover:shadow-xl hover:shadow-[#BC6034]/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Test Contact Form</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3 Feature Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Real-Time Notifications</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Incoming user questions are flagged as unread until reviewed.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Read / Unread Tracking</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Easily mark messages as read or perform bulk actions in one click.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Filtered Views</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Filter inquiries by specific programs, submission dates, or status.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <h3 className="text-lg font-bold text-[#4A362D]">No inquiries found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">No inquiry matching "{globalSearchQuery}" was found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedInquiries.map((inquiry) => (
              <div
                key={inquiry.inquiryId}
                className={`relative rounded-xl p-5 flex flex-col justify-between transition-all ${inquiry.read
                  ? "bg-white border border-gray-200 shadow-sm hover:shadow-md opacity-80"
                  : "bg-[#FFF8F3] border-l-4 border-y border-r border-[#BC6034] shadow-md shadow-[#BC6034]/10 hover:shadow-lg"
                  }`}
              >
                <div className="absolute top-4 left-4 z-10 bg-white/80 rounded backdrop-blur-sm p-0.5">
                  <input 
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-[#BC6034]"
                    checked={selectedInquiries.includes(inquiry.inquiryId)}
                    onChange={() => handleSelect(inquiry.inquiryId)}
                  />
                </div>
                <div className="pl-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs text-gray-400">
                      {inquiry.submittedAt && new Date(inquiry.submittedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {inquiry.interest && (
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 bg-[#EEDCC8] text-[#4A362D] rounded-full uppercase tracking-wider inline-block break-words whitespace-normal max-w-full"
                          title={inquiry.interest}
                        >
                          {inquiry.interest}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${inquiry.read
                          ? "bg-gray-100 text-gray-600"
                          : "bg-[#EEDCC8] text-[#BC6034]"
                          }`}
                      >
                        {inquiry.read ? "Read" : "Unread"}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-800 text-base mb-1 break-words break-all" title={inquiry.name}>
                    {inquiry.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mb-3 break-all" title={inquiry.email}>
                    {inquiry.email}
                  </p>

                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {inquiry.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-gray-50 pt-4 mt-6">
                  {!inquiry.read && (
                    <button
                      onClick={() => handleMarkRead(inquiry.inquiryId)}
                      disabled={loadingId === inquiry.inquiryId}
                      className="w-full bg-[#BC6034] hover:bg-[#A5522B] text-white py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      {loadingId === inquiry.inquiryId ? "Updating…" : "Mark Read"}
                    </button>
                  )}
                  <div className="flex gap-2 w-full">
                    <Link
                      to={`/admin/inquiries/${inquiry.inquiryId}`}
                      className="flex-1 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:border-[#BC6034] hover:text-[#BC6034] py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => setDeleteConfirm({ isOpen: true, type: 'single', id: inquiry.inquiryId })}
                      className="flex-1 bg-white border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm"
                    >
                      Delete
                    </button>
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
              {deleteConfirm.type === 'bulk' 
                ? `Are you sure you want to permanently delete ${selectedInquiries.length} inquiries? This action cannot be undone.`
                : "Are you sure you want to permanently delete this inquiry? This action cannot be undone."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm({ isOpen: false, type: null, id: null })}
                className="flex-1 px-4 py-2.5 bg-white border border-[#D8B49F] text-[#BC6034] rounded-xl text-sm font-bold hover:bg-[#F6E4D5] transition-all cursor-pointer shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
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
