const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'font-medium rounded-full inline-flex items-center gap-1';

  const variants = {
    primary: 'bg-primary-600/20 text-primary-300 border border-primary-500/30',
    secondary: 'bg-secondary-600/20 text-secondary-300 border border-secondary-500/30',
    success: 'bg-green-600/20 text-green-300 border border-green-500/30',
    warning: 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/30',
    danger: 'bg-red-600/20 text-red-300 border border-red-500/30',
    ghost: 'bg-white/5 text-gray-300 border border-white/10',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
