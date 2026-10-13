const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  status,
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const statusSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
  };

  const initials = alt
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size]} rounded-full object-cover bg-dark-700 ${className}`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center font-semibold text-white ${className}`}
        >
          {initials}
        </div>
      )}

      {status && (
        <div
          className={`${statusSizes[size]} rounded-full absolute bottom-0 right-0 border-2 border-dark-900 ${
            status === 'online'
              ? 'bg-green-500'
              : status === 'away'
              ? 'bg-yellow-500'
              : 'bg-gray-500'
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;
