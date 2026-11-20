import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';
import { deleteEnrollment, fetchEnrollments, fetchEnrollmentsByProgramId } from "../../api/enrollmentsApi";
import { toast } from "sonner";
import { STATUS_COLOR } from "../../constants";
import { useAdminSearch } from "../../context/AdminSearchContext.jsx";

const PAGE_SIZE = 6;

const isValidPhone = (phone) => {
  if (!phone) return false;
  const str = String(phone).trim();
  const digits = str.replace(/\D/g, "");
  return /^\d+$/.test(str) && digits.length >= 10 && digits.length <= 15 && !/^0+$/.test(digits);
};

const isValidName = (name) => {
  if (!name) return false;
  const str = String(name).trim();
  return /^[a-zA-Z\s'-]{2,50}$/.test(str);
};

export function EnrollmentList() {
  const [searchParams] = useSearchParams();
  const programId = searchParams.get("programId");
  const { globalSearchQuery } = useAdminSearch();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPage(0);
  }, [globalSearchQuery]);

  // Calendar View states
  const [viewMode, setViewMode] = useState("list"); // "list" or "calendar"
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarEnrollments, setCalendarEnrollments] = useState([]);
  const [loadingCalendar, setLoadingCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEnrollments, setSelectedDateEnrollments] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });
  const [jumpInput, setJumpInput] = useState("");

  const handleJump = (e) => {
    e.preventDefault();
    const p = parseInt(jumpInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      load(p - 1, filter);
    }
    setJumpInput("");
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const dayEnrollments = getEnrollmentsForDate(day);
    if (dayEnrollments.length > 0) {
      setSelectedDate(day);
      setSelectedDateEnrollments(dayEnrollments);
    }
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (programId) {
        result = await fetchEnrollmentsByProgramId(programId, 0, 2000);
      } else {
        result = await fetchEnrollments({ page: 0, size: 2000 });
      }
      setEnrollments(result.content || []);
    } catch (err) {
      setError(err?.message || "Failed to load enrollments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [programId]);

  // Load all enrollments for Calendar view
  useEffect(() => {
    if (viewMode === "calendar") {
      const loadAll = async () => {
        setLoadingCalendar(true);
        try {
          let result;
          if (programId) {
            result = await fetchEnrollmentsByProgramId(programId, 0, 2000);
          } else {
            result = await fetchEnrollments({ page: 0, size: 2000 });
          }
          setCalendarEnrollments(result.content || []);
        } catch (err) {
          console.error("Failed to load calendar enrollments:", err);
        } finally {
          setLoadingCalendar(false);
        }
      };
      loadAll();
    }
  }, [viewMode, programId]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(0);
  };

  const confirmDelete = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async () => {
    const id = deleteConfirm.id;
    if (!id) return;
    try {
      await deleteEnrollment(id);
      setEnrollments((prev) => prev.filter((e) => String(e.id) !== String(id)));
      
      // Update calendar state too if active
      if (viewMode === "calendar") {
        setCalendarEnrollments((prev) => prev.filter((e) => String(e.id) !== String(id)));
      }

      // Update selected date modal state if open
      if (selectedDateEnrollments.length > 0) {
        const updated = selectedDateEnrollments.filter((item) => String(item.id) !== String(id));
        if (updated.length === 0) {
          setSelectedDate(null);
          setSelectedDateEnrollments([]);
        } else {
          setSelectedDateEnrollments(updated);
        }
      }

      toast.success("Enrollment deleted successfully");
    } catch (err) {
      const message = err?.message || "Failed to delete enrollment";
      setError(message);
      toast.error(message);
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const handleExport = async () => {
    try {
      const allData = enrollments.filter((e) => {
        if (filter === "all") return true;
        return (e.status || "new").toLowerCase() === filter.toLowerCase();
      });

      if (allData.length === 0) {
        alert("No data to export");
        return;
      }

      const worksheetData = allData.map(e => ({
        "ID": e.id,
        "Name": e.name,
        "Program": e.program,
        "Email": e.email,
        "Phone": e.phone || "",
        "Enrollment Date": e.date ? new Date(e.date).toLocaleDateString("en-IN") : "",
        "Status": e.status?.toLowerCase() || "new",
        "Notes": (e.notes || "").replace(/\n/g, " ")
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Enrollments");

      const statusLabel = filter ? filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase() : "All";
      const dateStr = new Date().toISOString().split('T')[0];
      const fileName = `Enrollments_${programId ? `Program_${programId}_` : ""}${statusLabel}_${dateStr}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export enrollments. Please try again.");
    }
  };

  const sorted = useMemo(() => {
    return [...enrollments]
      .filter((e) => {
        const matchesStatus = filter === "all" || (e.status || "new").toLowerCase() === filter.toLowerCase();
        if (!matchesStatus) return false;
        if (!globalSearchQuery.trim()) return true;
        const q = globalSearchQuery.toLowerCase();
        const nameMatch = (e.name || "").toLowerCase().includes(q);
        const emailMatch = (e.email || "").toLowerCase().includes(q);
        const phoneMatch = String(e.phone || "").toLowerCase().includes(q);
        const progMatch = (e.program || "").toLowerCase().includes(q);
        const notesMatch = (e.notes || "").toLowerCase().includes(q);
        const idMatch = String(e.id || "").includes(q);
        return nameMatch || emailMatch || phoneMatch || progMatch || notesMatch || idMatch;
      })
      .sort((a, b) => b.id - a.id);
  }, [enrollments, filter, globalSearchQuery]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE) || 1;
  const paginatedEnrollments = useMemo(() => {
    const start = page * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  // Calendar logic helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEnrollmentsForDate = (date) => {
    if (!date) return [];
    const localDateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return calendarEnrollments.filter((e) => {
      if (!e.date) return false;
      const d = new Date(e.date);
      const eDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      
      const matchesStatus = filter === "all" || (e.status || "new").toLowerCase() === filter.toLowerCase();
      return eDateStr === localDateStr && matchesStatus;
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#4A362D]">Enrollments</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Program enrollment requests from the public website
          </p>
        </div>
        <div className="flex items-center gap-3">
          {programId && (
            <Link
              to="/admin/enrollments"
              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              Show All Enrollments
            </Link>
          )}

          {/* View Mode Toggle */}
          <div className="flex bg-[#FFF8F3] p-0.5 rounded-lg border border-[#EEDCC8] shadow-sm">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#BC6034] text-white shadow-sm shadow-[#BC6034]/20 border border-transparent"
                  : "text-[#BC6034] hover:bg-[#F6E4D5]/40"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === "calendar"
                  ? "bg-[#BC6034] text-white shadow-sm shadow-[#BC6034]/20 border border-transparent"
                  : "text-[#BC6034] hover:bg-[#F6E4D5]/40"
              }`}
            >
              Calendar
            </button>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm cursor-pointer"
          >
            <Download size={16} />
            Export to Excel
          </button>
          {viewMode === "list" && sorted.length > 0 && (
            <span className="text-xs text-[#BC6034] bg-[#F6E4D5]/60 border border-[#D8B49F]/30 px-3 py-1 rounded-full font-bold shadow-sm">
              Showing {sorted.length} {filter !== 'all' ? `${filter} ` : ''}record{sorted.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {["all", "new", "contacted", "confirmed", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleFilterChange(tab)}
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all cursor-pointer border shadow-sm ${
              filter === tab
                ? "bg-[#BC6034] border-transparent text-white shadow-sm shadow-[#BC6034]/20"
                : "bg-white border-gray-200 text-gray-600 hover:border-[#D8B49F] hover:bg-[#F6E4D5]/30 hover:text-[#BC6034]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {viewMode === "calendar" ? (
        loadingCalendar ? (
          <div className="text-center py-16 text-gray-400">
            Loading calendar enrollments...
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Calendar Month Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-[#4A362D]">
                {currentDate.toLocaleString("default", { month: "long" })} {year}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition text-gray-600"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-xs font-bold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Today
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition text-gray-600"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100 text-center py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 divide-x divide-y divide-gray-100 bg-gray-100">
              {days.map((day, idx) => {
                const dayEnrollments = getEnrollmentsForDate(day);
                const isToday =
                  day &&
                  day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth() &&
                  day.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={idx}
                    onClick={() => handleDateClick(day)}
                    className={`min-h-[110px] p-2 bg-white flex flex-col justify-between hover:bg-gray-50/30 transition-colors ${
                      day && dayEnrollments.length > 0 ? "cursor-pointer hover:bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                          isToday
                            ? "bg-[#BC6034] text-white shadow-sm"
                            : day
                            ? "text-gray-700"
                            : "text-transparent"
                        }`}
                      >
                        {day ? day.getDate() : ""}
                      </span>
                      {dayEnrollments.length > 0 && (
                        <span className="text-[10px] font-bold bg-[#BC6034]/15 text-[#BC6034] px-1.5 py-0.5 rounded-full">
                          {dayEnrollments.length}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 overflow-y-auto max-h-[75px] mt-1 flex-1">
                      {dayEnrollments.slice(0, 3).map((e) => (
                        <Link
                          key={e.id}
                          to={`/admin/enrollments/${e.id}`}
                          onClick={(evt) => evt.stopPropagation()}
                          className="block text-[10px] font-medium truncate px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-100/50"
                          title={`${e.name} - ${e.program}`}
                        >
                          {e.name}
                        </Link>
                      ))}
                      {dayEnrollments.length > 3 && (
                        <div className="text-[9px] text-gray-400 font-semibold px-1 py-0.5">
                          + {dayEnrollments.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      ) : loading ? (
        <div className="text-center py-16 text-gray-400">
          Loading enrollments...
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-500 font-medium mb-2">
            Failed to load enrollments
          </p>
          <p className="text-sm text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => load(0, filter)}
            className="px-4 py-2 bg-[#BC6034] text-white rounded-lg text-sm hover:bg-[#A35429] transition-colors"
          >
            Retry
          </button>
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No {filter !== "all" ? `${filter} ` : ""}enrollments found.</p>
          <p className="text-sm mt-1">
            {filter === "all"
              ? 'When visitors click "Enroll Now" on the Programs page, submissions will appear here.'
              : `There are currently no enrollments with status "${filter}".`}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEnrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs text-gray-400">
                      {enrollment.date
                        ? new Date(enrollment.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider capitalize ${STATUS_COLOR[enrollment.status?.toLowerCase()] || STATUS_COLOR.new}`}
                    >
                      {enrollment.status || "new"}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-800 text-base mb-1 break-words break-all" title={enrollment.name}>
                    {isValidName(enrollment.name) ? (
                      enrollment.name
                    ) : (
                      <span className="flex items-center gap-1.5 flex-wrap">
                        <span className="line-through text-red-400">{enrollment.name}</span>
                        <span className="text-[9px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Invalid Name</span>
                      </span>
                    )}
                  </h3>
                  <div className="mt-1.5 mb-4">
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 bg-[#EEDCC8] text-[#4A362D] rounded-lg uppercase tracking-wide inline-block break-words break-all whitespace-normal max-w-full leading-relaxed"
                      title={enrollment.program}
                    >
                      {enrollment.program}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-500 font-medium">
                    <p className="flex items-center gap-1.5 break-all min-w-0" title={enrollment.email}>
                      <span className="material-symbols-outlined text-[15px] text-gray-400 shrink-0">mail</span>
                      {enrollment.email}
                    </p>
                    {enrollment.phone && (
                      <p className="flex items-center gap-1.5">
                        <span className={`material-symbols-outlined text-[15px] shrink-0 ${isValidPhone(enrollment.phone) ? 'text-gray-400' : 'text-red-500'}`}>call</span>
                        {isValidPhone(enrollment.phone) ? (
                          enrollment.phone
                        ) : (
                          <span className="flex items-center gap-1 flex-wrap">
                            <span className="line-through text-red-400">{enrollment.phone}</span>
                            <span className="text-[9px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Invalid Phone</span>
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 border-t border-gray-50 pt-4 mt-6">
                  <Link
                    to={`/admin/enrollments/${enrollment.id}`}
                    className="flex-1 text-center bg-[#BC6034] hover:bg-[#A5522B] text-white py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                  >
                    View Detail
                  </Link>
                  <button
                    onClick={() => confirmDelete(enrollment.id)}
                    className="flex-1 text-center bg-white border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm"
                  >
                    Delete
                  </button>
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
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page + 1 >= totalPages}
                className="px-4 py-1.5 text-sm font-medium rounded-lg border border-[#D8B49F] text-[#BC6034] bg-white hover:bg-[#F6E4D5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      {/* Date Enrollments Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-[#4A362D] text-base">
                  Enrollments on {selectedDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedDateEnrollments.length} request{selectedDateEnrollments.length > 1 ? 's' : ''} received
                </p>
              </div>
              <button
                onClick={() => { setSelectedDate(null); setSelectedDateEnrollments([]); }}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body / Enrollment List */}
            <div className="p-4 divide-y divide-gray-100 overflow-y-auto flex-1">
              {selectedDateEnrollments.map((e) => (
                <div key={e.id} className="py-3 flex justify-between items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-semibold text-sm text-gray-800 break-words break-all block" title={e.name}>
                        {isValidName(e.name) ? (
                          e.name
                        ) : (
                          <span className="flex items-center gap-1.5 flex-wrap">
                            <span className="line-through text-red-400">{e.name}</span>
                            <span className="text-[9px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded uppercase">Invalid Name</span>
                          </span>
                        )}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider capitalize ${STATUS_COLOR[e.status?.toLowerCase()] || STATUS_COLOR.new}`}>
                        {e.status || "new"}
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 bg-[#EEDCC8] text-[#4A362D] rounded-lg uppercase tracking-wide inline-block break-words break-all whitespace-normal max-w-full mb-2 leading-relaxed"
                      title={e.program}
                    >
                      {e.program}
                    </span>
                    <div className="space-y-0.5 text-xs text-gray-500 font-medium">
                      <p className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-gray-400">mail</span>
                        {e.email}
                      </p>
                      {e.phone && (
                        <p className="flex items-center gap-1">
                          <span className={`material-symbols-outlined text-[13px] ${isValidPhone(e.phone) ? 'text-gray-400' : 'text-red-500'}`}>call</span>
                          {isValidPhone(e.phone) ? (
                            e.phone
                          ) : (
                            <span className="flex items-center gap-1 flex-wrap">
                              <span className="line-through text-red-400">{e.phone}</span>
                              <span className="text-[9px] bg-red-100 text-red-600 font-bold px-1 py-0.5 rounded uppercase">Invalid</span>
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <Link
                      to={`/admin/enrollments/${e.id}`}
                      className="bg-[#BC6034] hover:bg-[#A5522B] text-white px-3 py-1.5 rounded-lg text-xs font-semibold text-center transition-colors shadow-sm"
                      onClick={() => { setSelectedDate(null); setSelectedDateEnrollments([]); }}
                    >
                      View Detail
                    </Link>
                    <button
                      onClick={() => confirmDelete(e.id)}
                      className="bg-white border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => { setSelectedDate(null); setSelectedDateEnrollments([]); }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
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
              Are you sure you want to permanently delete this enrollment? This action cannot be undone.
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
