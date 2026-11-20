import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { deleteUser, fetchUsers } from "../../api/usersApi";
import { toast } from "sonner";
import { Users, Plus, Sparkles, Shield, UserCheck } from "lucide-react";
import { useAdminSearch } from "../../context/AdminSearchContext.jsx";

export function UserList() {
  const { globalSearchQuery } = useAdminSearch();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

  const confirmDelete = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async () => {
    const id = deleteConfirm.id;
    if (!id) return;
    try {
      await deleteUser(id);
      setUsers((prev) =>
        prev.filter((user) => String(user.adminId) !== String(id)),
      );
      toast.success("User deleted successfully");
    } catch (err) {
      const message = err?.message || "Failed to delete user";
      setError(message);
      toast.error(message);
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading users:", err);
        setError("Failed to load users");
        setUsers([]);
      }
    };
    load();
  }, []);

  const filteredUsers = users.filter((u) => {
    if (!globalSearchQuery.trim()) return true;
    const q = globalSearchQuery.toLowerCase();
    const nameMatch = (u.fullName || "").toLowerCase().includes(q);
    const emailMatch = (u.email || "").toLowerCase().includes(q);
    const phoneMatch = String(u.phone || "").toLowerCase().includes(q);
    const idMatch = String(u.adminId || "").includes(q);
    return nameMatch || emailMatch || phoneMatch || idMatch;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#4A362D]">Users</h1>
        <Link
          to="/admin/users/create"
          className="bg-[#BC6034] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#A0522D] transition"
        >
          + New User
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {users.length === 0 ? (
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
                <span>User & Admin Accounts</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#4A362D] tracking-tight leading-tight">
                No Administrator Accounts Found
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                Manage administrators, team members, and staff access to the NoMind portal. Create new user accounts to grant administrative permissions.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/admin/users/create"
                  className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#BC6034] to-[#A35429] hover:from-[#A35429] hover:to-[#8C431F] text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg shadow-[#BC6034]/25 hover:shadow-xl hover:shadow-[#BC6034]/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create Admin User</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Feature Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Role Access Control</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Grant secure portal access to team leads and content administrators.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Profile Management</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Update contact information, roles, and administrator details easily.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#EEDCC8]/60 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-[#FFF8F3] text-[#BC6034] border border-[#EEDCC8]/60 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4A362D]">Team Directory</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">View and manage all active system administrators in one place.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <h3 className="text-lg font-bold text-[#4A362D]">No users found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">No user matching "{globalSearchQuery}" was found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => {
            const initials = user.fullName
              ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              : 'U';
            return (
              <div key={user.adminId} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#EEDCC8] text-[#BC6034] font-bold flex items-center justify-center text-sm shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-base truncate">{user.fullName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">ID: {user.adminId}</p>
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-gray-400">call</span>
                      {user.phone || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-gray-100 pt-4 mt-auto">
                  <Link
                    to={`/admin/users/${user.adminId}/edit`}
                    className="flex-1 text-center bg-[#BC6034] hover:bg-[#A5522B] text-white py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                  >
                    Edit Detail
                  </Link>
                  <button
                    onClick={() => confirmDelete(user.adminId)}
                    className="flex-1 text-center bg-white border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
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
              Are you sure you want to permanently delete this user? This action cannot be undone.
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
