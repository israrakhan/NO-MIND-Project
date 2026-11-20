import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { deleteBooking, fetchBookings } from "../../api/bookingsApi";
import { toast } from "sonner";
import { CalendarCheck, Plus, Sparkles, Clock, Users } from "lucide-react";
import { isValidClientName } from "./BookingCreate";
import { useAdminSearch } from "../../context/AdminSearchContext.jsx";

export function BookingList() {
  const { globalSearchQuery } = useAdminSearch();
  const [pageSize, setPageSize] = useState(10);
  const [bookings, setBookings] = useState([]);
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
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => String(b.id) !== String(id)));
      toast.success("Booking deleted successfully");
    } catch (err) {
      const message = err?.message || "Failed to delete booking";
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
      const result = await fetchBookings({ page: 0, size: 2000 });
      setBookings(result.content || []);
    } catch (err) {
      setError(err?.message || "Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(0);
  };

  useEffect(() => {
    load();
  }, []);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (!globalSearchQuery.trim()) return true;
    const q = globalSearchQuery.toLowerCase();
    const nameMatch = (b.clientName || "").toLowerCase().includes(q);
    const dateMatch = String(b.date || "").toLowerCase().includes(q);
    const statusMatch = (b.status || "").toLowerCase().includes(q);
    const idMatch = String(b.id || "").includes(q);
    return nameMatch || dateMatch || statusMatch || idMatch;
  });

  const totalPages = Math.ceil(filteredBookings.length / pageSize) || 1;
  const paginatedBookings = filteredBookings.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#4A362D]">Custom Bookings</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#D8B49F]/70 shadow-sm">
            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="text-xs font-bold text-[#4A362D] bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <Link
            to="/admin/bookings/create"
            className="bg-[#BC6034] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#A0522D] transition shadow-sm whitespace-nowrap"
          >
            + New Booking
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">
          Loading bookings...
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-500 font-medium mb-2">
            Failed to load bookings
          </p>
          <p className="text-sm text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => load(0)}
            className="px-4 py-2 bg-[#BC6034] text-white rounded-lg text-sm hover:bg-[#A35429] transition-colors"
          >
            Retry
          </button>
        </div>
      ) : bookings.length === 0 ? (
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
                <span>Booking Management</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#4A362D] tracking-tight leading-tight">
                No Custom Bookings Found
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                Manage personal 1-on-1 sessions and custom group bookings for your clients. Schedule new appointments and keep track of client consultations from here.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/admin/bookings/create"
                  className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#BC6034] to-[#A35429] hover:from-[#A35429] hover:to-[#8C431F] text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg shadow-[#BC6034]/25 hover:shadow-xl hover:shadow-[#BC6034]/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create New Booking</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Feature Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">1-on-1 Consultations</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Schedule private sessions, assign dates, and track client inquiries.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Flexible Timings</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Set preferred session durations and manage booking status seamlessly.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Client Contact Directory</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Store client phone numbers and email details securely for follow-ups.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <h3 className="text-lg font-bold text-[#4A362D]">No bookings found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">No custom booking matching "{globalSearchQuery}" was found</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Client</th>
                  <th className="px-6 py-3 text-left">Date of Appointment</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{booking.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={!isValidClientName(booking.clientName) ? "line-through text-red-500 font-medium" : "text-gray-900"}>
                          {booking.clientName}
                        </span>
                        {!isValidClientName(booking.clientName) && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full border border-red-200 uppercase tracking-wider">
                            Invalid Name
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{booking.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link
                        to={`/admin/bookings/${booking.id}`}
                        className="bg-[#BC6034] hover:bg-[#A5522B] text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                      >
                        View Detail
                      </Link>
                      <button
                        onClick={() => confirmDelete(booking.id)}
                        className="bg-white border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-xs font-semibold text-gray-500">
              Showing {filteredBookings.length} record{filteredBookings.length !== 1 ? 's' : ''} (Page {page + 1} of {totalPages})
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
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
          </div>
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
              Are you sure you want to permanently delete this booking? This action cannot be undone.
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
