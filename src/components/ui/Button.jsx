import { forwardRef } from 'react';

const variants = {
  primary: 'bg-[#E50914] text-white hover:bg-[#F5051D] shadow-lg hover:shadow-red-900/50 active:scale-[0.97]',
  secondary: 'bg-gray-700 text-white hover:bg-gray-600 active:scale-[0.97]',
  ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-gray-800 active:scale-[0.97]',
  icon: 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2 active:scale-[0.90]',
  danger: 'bg-red-700 text-white hover:bg-red-800 active:scale-[0.97]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', className = '', disabled, loading, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${variant !== 'icon' ? sizes[size] : ''} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
});

export default Button;
