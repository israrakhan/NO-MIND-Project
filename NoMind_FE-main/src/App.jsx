import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes.jsx';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'bg-surface text-on-surface border border-outline-variant shadow-2xl rounded-xl font-body-md',
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-on-surface)',
            borderColor: 'var(--color-outline-variant)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }
        }} 
      />
      <RouterProvider router={router} />
    </>
  );
}
