import React from 'react';

// Accessible Button Component
export const AccessibleButton = ({ onClick, label, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`${className} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
      role="button"
    >
      {children}
    </button>
  );
};

// Accessible Form Input Component
export const AccessibleInput = ({ 
  label, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  error,
  required = false,
  onKeyPress
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2">
        {label}
        {required && <span aria-label="required field" className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required={required}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Accessible Modal Dialog
export const AccessibleDialog = ({ isOpen, onClose, title, children }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 id="dialog-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        {children}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};