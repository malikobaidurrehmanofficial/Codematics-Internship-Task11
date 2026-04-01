import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, id, className = '', type = 'text', ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-1.5 text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={`w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-[#E50914]/50 focus:border-[#E50914]
          transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
});

export default Input;
