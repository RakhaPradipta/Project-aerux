import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingSpinner = ({ 
  size = 'md',
  text = 'Loading...',
  fullscreen = false,
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <AiOutlineLoading3Quarters 
        size={40}
        className="animate-spin text-primary-500"
      />
      {text && <p className="text-gray-300">{text}</p>}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
