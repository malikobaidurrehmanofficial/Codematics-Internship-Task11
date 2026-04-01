import { classNames } from '../../utils/helpers';

const variants = {
  primary:
    'bg-[#E50914] text-white shadow-[0_16px_40px_rgba(229,9,20,0.35)] hover:-translate-y-0.5 hover:bg-[#F21A25] hover:shadow-[0_22px_44px_rgba(229,9,20,0.45)]',
  secondary:
    'border border-white/12 bg-white/[0.06] text-white hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.10]',
  ghost: 'bg-transparent text-gray-300 hover:bg-white/[0.08] hover:text-white',
};

const sizes = {
  sm: 'h-10 rounded-full px-4 text-sm',
  md: 'h-11 rounded-full px-5 text-sm',
  lg: 'h-12 rounded-full px-6 text-base',
};

export default function MovixButton({
  type = 'button',
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={classNames(
        'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition duration-300 disabled:pointer-events-none disabled:opacity-50',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
