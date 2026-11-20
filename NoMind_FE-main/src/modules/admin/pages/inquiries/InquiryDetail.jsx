import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { fetchInquiryById, markInquiryRead, respondToInquiry, deleteInquiry } from '../../api/inquiriesApi';
import { toast } from 'sonner';

export function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchInquiryById(id);
        setInquiry(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Loading inquiry...</div>;
  if (!inquiry) return <div className="p-6 text-red-500">Inquiry not found.</div>;

  const handleMarkRead = async () => {
    if (inquiry?.read) return;
    setUpdatingStatus(true);
    await markInquiryRead(id);
    setInquiry((prev) => ({ ...prev, read: true }));
    setUpdatingStatus(false);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    setSending(true);
    await respondToInquiry(id, reply);
    setInquiry((prev) => ({ ...prev, read: true, replied: true, replyMessage: reply }));
    setReply('');
    setSending(false);
  };

  const confirmDelete = () => {
    setDeleteConfirm(true);
  };

  const executeDelete = async () => {
    try {
      await deleteInquiry(id);
      toast.success("Inquiry deleted successfully");
      navigate("/admin/inquiries");
    } catch (err) {
      const message = err?.message || "Failed to delete inquiry";
      toast.error(message);
    } finally {
      setDeleteConfirm(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-[#4A362D] mb-6">Inquiry Detail</h1>

      {/* Main Cohesive Card Box */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-6">
        
        {/* Status Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${inquiry.read ? 'bg-gray-100 text-gray-600' : 'bg-[#EEDCC8] text-[#BC6034]'}`}>
              {inquiry.read ? 'Read' : 'Unread'}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${inquiry.replied ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {inquiry.replied ? 'Replied' : 'Awaiting reply'}
            </span>
          </div>
          {!inquiry.read && (
            <button
              onClick={handleMarkRead}
              disabled={updatingStatus}
              className="text-xs font-semibold text-[#BC6034] bg-[#F6E4D5] px-3.5 py-1.5 rounded-lg border border-[#D8B49F] hover:bg-[#E8CCB0] transition disabled:opacity-60 cursor-pointer shadow-xs"
            >
              {updatingStatus ? 'Updating…' : 'Mark as read'}
            </button>
          )}
        </div>

        {/* Side-by-Side Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Column: Details Card */}
          <div className="bg-[#FFF8F3]/80 border border-[#EEDCC8]/80 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs font-semibold">Name</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{inquiry?.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold">Email</p>
                  <p className="font-semibold text-gray-800 break-all mt-0.5">{inquiry?.email}</p>
                </div>
              </div>
              {inquiry?.phone && (
                <div>
                  <p className="text-gray-500 text-xs font-semibold">Phone</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{inquiry.phone}</p>
                </div>
              )}
              {inquiry?.interest && (
                <div>
                  <p className="text-gray-500 text-xs font-semibold mb-1">Area of Interest</p>
                  <span className="inline-block text-xs px-2.5 py-1 bg-[#EEDCC8] text-[#4A362D] rounded-full font-semibold">{inquiry.interest}</span>
                </div>
              )}
              <div>
                <p className="text-gray-500 text-xs font-semibold">Subject</p>
                <p className="font-semibold text-gray-800 mt-0.5">{inquiry?.subject}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-semibold">Message</p>
                <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed mt-0.5">{inquiry?.message}</p>
              </div>
            </div>

            {inquiry?.submittedAt && (
              <div className="border-t border-gray-100 pt-3 mt-4">
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Received</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{new Date(inquiry.submittedAt).toLocaleString('en-IN')}</p>
              </div>
            )}
          </div>

          {/* Right Column: Send Reply Form */}
          <form onSubmit={handleReply} className="border border-gray-100 bg-gray-50/60 rounded-xl p-6 flex flex-col justify-between h-full">
            <div className="space-y-3 flex-1 flex flex-col">
              <h2 className="font-bold text-gray-800 text-base">Send Reply</h2>
              <textarea
                rows={6}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
                placeholder="Type your response here..."
                className="w-full flex-1 border border-gray-250 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#BC6034]/40 focus:border-[#BC6034] resize-none bg-white text-sm leading-relaxed"
              />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={sending}
                className="bg-[#BC6034] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#A5522B] transition disabled:opacity-60 cursor-pointer shadow-sm shadow-[#BC6034]/20"
              >
                {sending ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-8 border-t border-gray-200 pt-6">
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-sm"
        >
          Delete Inquiry
        </button>
        <button
          onClick={() => navigate('/admin/inquiries')}
          className="px-4 py-2 bg-white border border-[#D8B49F] text-[#BC6034] rounded-lg text-sm font-bold hover:bg-[#F6E4D5]/30 transition-all cursor-pointer shadow-sm"
        >
          Back to Inquiries
        </button>
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
              Are you sure you want to permanently delete this inquiry? This action cannot be undone.
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
