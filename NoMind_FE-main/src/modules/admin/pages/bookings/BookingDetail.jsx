import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { fetchBookingById, updateBookingStatus } from '../../api/bookingsApi';
import { isValidClientName } from './BookingCreate';

export function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBookingById(id);
        setBooking(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Loading booking...</div>;
  if (!booking) return <div className="p-6 text-red-500">Booking not found.</div>;

  const handleStatusChange = async (status) => {
    await updateBookingStatus(id, status);
    setBooking((prev) => ({ ...prev, status }));
  };

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

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold text-[#4A362D] mb-6">Custom Booking Detail</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Booking ID</p>
            <p className="font-medium">{booking?.id}</p>
          </div>
          <div>
            <p className="text-gray-500">Client</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className={`font-medium ${!isValidClientName(booking?.clientName) ? "line-through text-red-500" : ""}`}>
                {booking?.clientName || booking?.userName || '—'}
              </p>
              {!isValidClientName(booking?.clientName) && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full border border-red-200 uppercase tracking-wider">
                  Invalid Name
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-gray-500">Date of Appointment</p>
            <p className="font-medium">{booking?.date}</p>
          </div>
          <div>
            <p className="text-gray-500">Time</p>
            <p className="font-medium">{booking?.time || '—'}</p>
          </div>
          <div>
            <p className="text-gray-500">Service</p>
            <p className="font-medium">{booking?.service}</p>
          </div>
          <div>
            <p className="text-gray-500">Booking Type</p>
            <p className="font-medium">{booking?.bookingType || 'Individual'}</p>
          </div>
          {booking?.bookingType === 'Group' && (
            <div>
              <p className="text-gray-500">No. of Participants</p>
              <p className="font-medium">{booking?.participants || '—'}</p>
            </div>
          )}
          <div>
            <p className="text-gray-500">Age Group</p>
            <p className="font-medium">{booking?.ageGroup || '—'}</p>
          </div>
          <div>
            <p className="text-gray-500">Occupation</p>
            <p className="font-medium">{booking?.occupation || '—'}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(booking?.status)}`}>
              {booking?.status}
            </span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t items-center">
          {booking?.status?.toLowerCase() !== 'confirmed' && (
            <button
              onClick={() => handleStatusChange('confirmed')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition cursor-pointer shadow-sm"
            >
              Confirm
            </button>
          )}
          {booking?.status?.toLowerCase() !== 'cancelled' && (
            <button
              onClick={() => handleStatusChange('cancelled')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition cursor-pointer shadow-sm"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => navigate('/admin/bookings')}
            className="px-4 py-2 bg-white border border-[#D8B49F] text-[#BC6034] rounded-lg text-sm font-bold hover:bg-[#F6E4D5]/30 transition-colors shadow-sm ml-auto cursor-pointer"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    </div>
  );
}
