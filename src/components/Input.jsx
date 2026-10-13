import { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  icon: Icon,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'w-full px-4 py-3 rounded-lg transition-smooth focus-ring bg-dark-800 border text-white placeholder-gray-500';
  
  const variants = {
    default: 'border-dark-700 focus:border-primary-500 hover:border-dark-600',
    outline: 'border-2 border-gray-600 focus:border-primary-500',
    ghost: 'border-transparent bg-white/5 hover:bg-white/10 focus:bg-white/15',
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={`${baseStyles} ${variants[variant]} ${error ? 'border-red-500 focus:border-red-500' : ''} ${Icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        )}
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-400 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
