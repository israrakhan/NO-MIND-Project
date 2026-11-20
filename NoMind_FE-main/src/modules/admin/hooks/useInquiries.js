import { useState, useEffect } from 'react';
import { fetchInquiries, respondToInquiry } from '../api/inquiriesApi';

export const useInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        const data = await fetchInquiries();
        setInquiries(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadInquiries();
  }, []);

  const handleResponse = async (inquiryId, message) => {
    try {
      await respondToInquiry(inquiryId, message);
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === inquiryId ? { ...inquiry, response: message } : inquiry
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  return { inquiries, loading, error, handleResponse };
};
