import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
          success: {
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '8px',
              padding: '14px 16px',
              boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.3)',
            },
            icon: '✓',
            duration: 3500,
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#ffffff',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '8px',
              padding: '14px 16px',
              boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.3)',
            },
            icon: '✕',
            duration: 4000,
          },
          loading: {
            style: {
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#ffffff',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '8px',
              padding: '14px 16px',
              boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.3)',
            },
            icon: '⏳',
          },
          style: {
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            color: '#ffffff',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            borderRadius: '8px',
            padding: '14px 16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
          },
        }}
        containerStyle={{
          top: '20px',
          zIndex: 10000,
        }}
      />

      <style>{`
        @keyframes slideInDown {
          from {
            transform: translate3d(0, -100%, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @keyframes slideOutUp {
          from {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
          to {
            transform: translate3d(0, -100%, 0);
            opacity: 0;
          }
        }

        [role="status"] {
          animation: slideInDown 0.3s ease-out !important;
        }
      `}</style>
    </>
  );
};

export default ToastProvider;
