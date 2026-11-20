import { useState, useEffect } from 'react';
import {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../api/bookingsApi';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const addBooking = async (bookingData) => {
    try {
      const newBooking = await createBooking(bookingData);
      setBookings((prev) => [...prev, newBooking]);
    } catch (err) {
      setError(err);
    }
  };

  const editBooking = async (id, bookingData) => {
    try {
      const updatedBooking = await updateBooking(id, bookingData);
      setBookings((prev) =>
        prev.map((booking) => (booking.id === id ? updatedBooking : booking))
      );
    } catch (err) {
      setError(err);
    }
  };

  const removeBooking = async (id) => {
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return { bookings, loading, error, addBooking, editBooking, removeBooking };
};
