import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  ...props
}, ref) => {
  const base = 'btn-elegant focus:outline-none focus:ring-2 focus:ring-primary-700/30 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary-900 text-cream-50 hover:bg-primary-950 shadow-soft-lg px-2',
    gold: 'bg-gold-500 text-ink-900 hover:bg-gold-400 shadow-soft',
    outline: 'border border-ink-900/20 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-white',
    light: 'bg-white text-ink-900 border border-ink-900/10 hover:shadow-soft-lg',
    ghost: 'text-ink-700 hover:text-ink-900 hover:bg-ink-900/5',
    dark: 'bg-ink-900 text-white hover:bg-black',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-[15px]',
    lg: 'px-8 py-3.5 text-base',
  };
  return (
    <button ref={ref} disabled={disabled || isLoading} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {isLoading ? 'Memuat...' : children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
