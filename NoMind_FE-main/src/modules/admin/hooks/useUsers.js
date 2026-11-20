import { useState, useEffect } from 'react';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../api/usersApi';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const addUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      setUsers((prev) => [...prev, newUser]);
    } catch (err) {
      setError(err);
    }
  };

  const editUser = async (userId, userData) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (err) {
      setError(err);
    }
  };

  const removeUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      setError(err);
    }
  };

  return { users, loading, error, addUser, editUser, removeUser };
};
