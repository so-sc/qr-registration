import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-pulse">
      
      <div className="w-full h-48 bg-gray-700/40 rounded-2xl" />
      
      <div className="space-y-4 text-center py-5">
        <div className="h-8 bg-gray-700/40 w-3/4 mx-auto rounded" />
        <div className="h-4 bg-gray-700/40 w-2/3 mx-auto rounded" />
      </div>
      
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-gray-700/40 w-24 rounded" />
            <div className="h-10 bg-gray-700/40 rounded" />
          </div>
        ))}
        
        <div className="h-10 bg-gray-700/40 rounded mt-6" />
      </div>
    </div>
  );
};

export default SkeletonLoader;