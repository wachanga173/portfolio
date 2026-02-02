import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-pulse text-primary-500 text-xl font-bold">PW</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
