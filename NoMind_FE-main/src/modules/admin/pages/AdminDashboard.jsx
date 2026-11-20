import { useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  CalendarCheck,
  MessageSquare,
  Users,
  BookOpen,
  ClipboardList,
  ArrowRight,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { fetchUsers } from "../api/usersApi";
import { fetchBookings } from "../api/bookingsApi";
import { fetchInquiries } from "../api/inquiriesApi";
import { fetchPrograms } from "../api/programsApi";
import { fetchEnrollments } from "../api/enrollmentsApi";
import { STATUS_COLOR } from "../constants";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut", delay },
});


function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  subColor,
  path,
  accentBg,
  accentText,
  delay,
}) {
  return (
    <motion.div {...fadeUp(delay)}>
      <Link
        to={path}
        className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-start justify-between">
          <div className={`p-3 rounded-xl ${accentBg}`}>
            <Icon className={`w-5 h-5 ${accentText}`} />
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#BC6034] group-hover:translate-x-1 transition-all duration-200" />
        </div>
        <div className="relative">
          <div className="text-3xl font-bold text-[#4A362D]">{value}</div>
          <div className="text-sm text-gray-500 mt-0.5">{label}</div>
          {sub && (
            <span
              className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${subColor || "bg-gray-100 text-gray-500"}`}
            >
              {sub}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function ActivityRow({
  icon: Icon,
  iconClass,
  title,
  meta,
  badge,
  badgeClass,
  delay,
}) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0"
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconClass}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0" title={title}>
        <p className="text-sm font-medium text-gray-800 break-words break-all whitespace-normal leading-snug" title={title}>
          {title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 break-all" title={meta}>{meta}</p>
      </div>
      {badge && (
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${badgeClass}`}
        >
          {badge}
        </span>
      )}
    </motion.div>
  );
}

export function AdminDashboard() {
  const { admin } = useAdminAuth();
  const isAdmin = admin?.userType?.toUpperCase() === "ADMIN" || admin?.role?.toUpperCase() === "ADMIN";

  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [programs, setPrograms] = useState([]);
  const [programsCount, setProgramsCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const [
        enrollmentsData,
        inquiriesData,
        bookingsData,
        programsData,
        usersData,
      ] = await Promise.all([
        fetchEnrollments(),
        fetchInquiries(),
        fetchBookings(),
        fetchPrograms(),
        fetchUsers(),
      ]);

      // Enrollments
      setEnrollments(
        Array.isArray(enrollmentsData?.content)
          ? enrollmentsData.content
          : Array.isArray(enrollmentsData)
            ? enrollmentsData
            : [],
      );
      setEnrollmentsCount(
        typeof enrollmentsData?.totalElements === "number"
          ? enrollmentsData.totalElements
          : 0,
      );

      // Inquiries
      setInquiries(
        Array.isArray(inquiriesData?.content)
          ? inquiriesData.content
          : Array.isArray(inquiriesData)
            ? inquiriesData
            : [],
      );
      setInquiriesCount(
        typeof inquiriesData?.totalElements === "number"
          ? inquiriesData.totalElements
          : 0,
      );

      // Bookings
      setBookings(
        Array.isArray(bookingsData?.content)
          ? bookingsData.content
          : Array.isArray(bookingsData)
            ? bookingsData
            : [],
      );
      setBookingsCount(
        typeof bookingsData?.totalElements === "number"
          ? bookingsData.totalElements
          : 0,
      );

      // Programs
      const programList = Array.isArray(programsData?.content)
        ? programsData.content
        : Array.isArray(programsData)
          ? programsData
          : [];
      setPrograms(programList);
      setProgramsCount(
        typeof programsData?.totalElements === "number"
          ? programsData.totalElements
          : 0,
      );

      // Users
      setUsers(Array.isArray(usersData) ? usersData : []);
      setUsersCount(Array.isArray(usersData) ? usersData.length : 0);
    };
    load();
  }, []);

  const { stats, recentEnrollments, recentInquiries } = useMemo(() => {
    return {
      stats: {
        enrollments: {
          total: enrollmentsCount,
          newCount: enrollments.filter((e) => e.status === "new").length,
        },
        inquiries: {
          total: inquiriesCount,
          unread: inquiries.filter((i) => !i.read).length,
        },
        bookings: {
          total: bookingsCount,
          pending: bookings.filter((b) => b.status === "pending").length,
        },
        programs: { total: programsCount },
        users: { total: usersCount },
      },
      recentEnrollments: [...enrollments]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5),
      recentInquiries: [...inquiries]
        .sort(
          (a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0),
        )
        .slice(0, 5),
    };
  }, [
    bookings,
    bookingsCount,
    enrollments,
    enrollmentsCount,
    inquiries,
    inquiriesCount,
    programsCount,
    usersCount,
  ]);

  return (
    <div className="space-y-8 px-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          icon={ClipboardList}
          label="Enrollments"
          value={stats.enrollments.total}
          sub={
            stats.enrollments.newCount > 0
              ? `${stats.enrollments.newCount} new`
              : "All reviewed"
          }
          subColor={
            stats.enrollments.newCount > 0
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }
          path="/admin/enrollments"
          accentBg="bg-blue-50"
          accentText="text-blue-600"
          delay={0.05}
        />
        <StatCard
          icon={MessageSquare}
          label="Inquiries"
          value={stats.inquiries.total}
          sub={
            stats.inquiries.unread > 0
              ? `${stats.inquiries.unread} unread`
              : "All read"
          }
          subColor={
            stats.inquiries.unread > 0
              ? "bg-[#EEDCC8] text-[#BC6034]"
              : "bg-green-100 text-green-700"
          }
          path="/admin/inquiries"
          accentBg="bg-[#EEDCC8]"
          accentText="text-[#BC6034]"
          delay={0.1}
        />
        <StatCard
          icon={CalendarCheck}
          label="Bookings"
          value={stats.bookings.total}
          sub={
            stats.bookings.pending > 0
              ? `${stats.bookings.pending} pending`
              : "Up to date"
          }
          subColor={
            stats.bookings.pending > 0
              ? "bg-orange-100 text-orange-700"
              : "bg-green-100 text-green-700"
          }
          path="/admin/bookings"
          accentBg="bg-orange-50"
          accentText="text-orange-500"
          delay={0.15}
        />
        <StatCard
          icon={BookOpen}
          label="Workshops"
          value={stats.programs.total}
          sub="Total workshops"
          subColor="bg-purple-100 text-purple-700"
          path="/admin/programs"
          accentBg="bg-purple-50"
          accentText="text-purple-600"
          delay={0.2}
        />
        {isAdmin && (
          <StatCard
            icon={Users}
            label="Users"
            value={stats.users.total}
            sub="Registered"
            subColor="bg-pink-100 text-pink-700"
            path="/admin/users"
            accentBg="bg-pink-50"
            accentText="text-pink-600"
            delay={0.25}
          />
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <motion.div
          {...fadeUp(0.35)}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-base font-semibold text-[#4A362D]">
                Recent Enrollments
              </h2>
            </div>
            <Link
              to="/admin/enrollments"
              className="text-xs text-[#BC6034] hover:underline font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentEnrollments.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No enrollments yet
            </p>
          ) : (
            recentEnrollments.map((e, i) => (
              <ActivityRow
                key={e.id || `enrollment-${i}`}
                icon={UserCheck}
                iconClass="bg-blue-50 text-blue-500"
                title={`${e.name} — ${e.program || "Program"}`}
                meta={
                  e.submittedAt
                    ? new Date(e.submittedAt).toLocaleDateString("en-IN")
                    : e.email
                }
                badge={e.status}
                badgeClass={
                  STATUS_COLOR[e.status] || "bg-gray-100 text-gray-500"
                }
                delay={0.38 + i * 0.05}
              />
            ))
          )}
        </motion.div>

        {/* Recent Inquiries */}
        <motion.div
          {...fadeUp(0.4)}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#EEDCC8] rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#BC6034]" />
              </div>
              <h2 className="text-base font-semibold text-[#4A362D]">
                Recent Inquiries
              </h2>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs text-[#BC6034] hover:underline font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No inquiries yet
            </p>
          ) : (
            recentInquiries.map((inq, i) => {
              const inquiryTitle = inq.name
                ? inq.interest
                  ? `${inq.name} — ${inq.interest}`
                  : inq.name
                : inq.subject || "Inquiry";
              return (
                <ActivityRow
                  key={inq.id || `inquiry-${i}`}
                  icon={MessageSquare}
                  iconClass="bg-[#EEDCC8] text-[#BC6034]"
                  title={inquiryTitle}
                  meta={
                    inq.submittedAt
                      ? new Date(inq.submittedAt).toLocaleDateString("en-IN")
                      : inq.email
                  }
                  badge={inq.read ? "read" : "unread"}
                  badgeClass={inq.read ? STATUS_COLOR.read : STATUS_COLOR.unread}
                  delay={0.43 + i * 0.05}
                />
              );
            })
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div {...fadeUp(0.55)}>
        <h2 className="text-base font-semibold text-[#4A362D] mb-3">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            {
              label: "New Workshop",
              path: "/admin/programs/create",
              icon: BookOpen,
              color:
                "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200",
            },
            {
              label: "New Booking",
              path: "/admin/bookings/create",
              icon: CalendarCheck,
              color:
                "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
            },
            ...(isAdmin ? [{
              label: "New About Milestone",
              path: "/admin/experience/create",
              icon: TrendingUp,
              color:
                "bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200",
            }] : []),
            {
              label: "View Enrollments",
              path: "/admin/enrollments",
              icon: ClipboardList,
              color:
                "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
            },
            {
              label: "View Inquiries",
              path: "/admin/inquiries",
              icon: MessageSquare,
              color:
                "bg-[#EEDCC8] text-[#BC6034] hover:bg-[#D4956A]/20 border-[#D4956A]/40",
            },
          ].map(({ label, path, icon: Icon, color }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors duration-200 ${color}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
