import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { deleteEnrollment, fetchEnrollmentById, updateEnrollmentNotes, updateEnrollmentStatus } from '../../api/enrollmentsApi';

const STATUS_OPTIONS = ['new', 'contacted', 'confirmed', 'cancelled'];

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
};

export function EnrollmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState(null);
  const [notes, setNotes] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEnrollmentById(id);
        setEnrollment(data);
        setNotes(data?.notes || '');
      } catch {
        setEnrollment(null);
      }
    };
    load();
  }, [id]);

  if (!enrollment) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Enrollment not found.</p>
        <Link to="/admin/enrollments" className="text-[#BC6034] hover:underline text-sm mt-2 inline-block">
          Back to Enrollments
        </Link>
      </div>
    );
  }

  const handleStatusChange = async (status) => {
    const uppercaseStatus = status.toUpperCase();
    await updateEnrollmentStatus(id, { status: uppercaseStatus });
    setEnrollment({ ...enrollment, status: uppercaseStatus });
  };

  const handleSaveNotes = async () => {
    await updateEnrollmentNotes(id, { notes });
    navigate('/admin/enrollments');
  };

  const confirmDelete = () => {
    setDeleteConfirm(true);
  };

  const executeDelete = async () => {
    await deleteEnrollment(id);
    navigate('/admin/enrollments');
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#4A362D]">Enrollment Details</h1>
        <p className="text-sm text-gray-500">Submitted on {enrollment.submittedAt ? new Date(enrollment.submittedAt).toLocaleString('en-IN') : '—'}</p>
      </div>

      {/* Details card */}
      <div className="bg-white rounded-xl shadow border border-gray-100 p-6 space-y-4 mb-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Full Name</p>
            {/^[a-zA-Z\s'-]{2,50}$/.test(String(enrollment.name || '').trim()) ? (
              <p className="font-semibold text-[#4A362D] break-words break-all">{enrollment.name}</p>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-red-500 line-through">{enrollment.name}</span>
                <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded uppercase">Invalid Name</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Program</p>
            <p className="font-medium text-[#BC6034] break-words break-all" title={enrollment.program}>{enrollment.program}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Email</p>
            <a href={`mailto:${enrollment.email}`} className="text-[#BC6034] hover:underline text-sm">{enrollment.email}</a>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Phone</p>
            {enrollment.phone ? (
              (() => {
                const str = String(enrollment.phone).trim();
                const digits = str.replace(/\D/g, "");
                const isValid = /^\d+$/.test(str) && digits.length >= 10 && digits.length <= 15 && !/^0+$/.test(digits);
                return isValid ? (
                  <p className="text-sm text-gray-700">{enrollment.phone}</p>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-red-500 line-through">{enrollment.phone}</span>
                    <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded uppercase">Invalid Phone Number</span>
                  </div>
                );
              })()
            ) : (
              <p className="text-sm text-gray-700">—</p>
            )}
          </div>
        </div>

        {enrollment.message && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Message</p>
            <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-lg p-3">{enrollment.message}</p>
          </div>
        )}
      </div>

      {/* Status update */}
      <div className="bg-white rounded-xl shadow border border-gray-100 p-6 mb-5">
        <p className="text-sm font-medium text-gray-700 mb-3">Update Status</p>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize border transition-all ${
                enrollment.status?.toLowerCase() === s.toLowerCase()
                  ? `${STATUS_COLORS[s]} border-transparent shadow-sm`
                  : 'border-gray-200 text-gray-500 hover:border-[#BC6034] hover:text-[#BC6034]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Admin notes */}
      <div className="bg-white rounded-xl shadow border border-gray-100 p-6 mb-5">
        <p className="text-sm font-medium text-gray-700 mb-2">Admin Notes</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Add internal notes about this enrollment..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BC6034]/40 focus:border-[#BC6034] resize-none"
        />
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleSaveNotes}
            className="px-4 py-2 bg-[#BC6034] text-white rounded-lg text-sm font-medium hover:bg-[#A35429] transition-colors"
          >
            Save Notes
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="flex justify-end gap-3">
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm"
        >
          Delete Enrollment
        </button>
        <Link
          to="/admin/enrollments"
          className="px-4 py-2 bg-white border border-[#D8B49F] text-[#BC6034] rounded-lg text-sm font-bold hover:bg-[#F6E4D5]/30 transition-colors shadow-sm"
        >
          Back to Enrollments
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
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
                onClick={() => setDeleteConfirm(false)}
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
