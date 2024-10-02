const SkeletonLoader = () => {
    return (
      <div className="max-w-2xl mx-auto md:pt-5 pt-10 space-y-6 p-5">
        <div className="space-y-2 md:py-8 py-8 text-center">
          <div className="h-8 w-40 bg-gray-200 animate-pulse mx-auto rounded"></div>
          <div className="h-6 w-2/3 bg-gray-200 animate-pulse mx-auto rounded"></div>
        </div>
  
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="space-y-4 pb-10" key={index}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
        <div className="relative">
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  };
  export default SkeletonLoader;