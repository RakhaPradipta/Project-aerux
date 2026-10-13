const Skeleton = ({ 
  variant = 'text', 
  count = 1, 
  className = '' 
}) => {
  const baseStyles = 'animate-shimmer bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 rounded';
  
  const variants = {
    text: 'h-4 w-full mb-2',
    title: 'h-6 w-2/3 mb-3',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-40 w-full rounded-lg',
    button: 'h-10 w-24 rounded-lg',
  };

  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className={`${baseStyles} ${variants[variant]} ${className}`}
        />
      ))}
    </>
  );
};

export default Skeleton;
