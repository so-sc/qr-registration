// app/loading.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto md:pt-5 pt-10 bg-gray-900">
      <div className="fixed top-0 left-0 border-white/10 bg-gray-900 z-50 w-full p-5 py-7 border-b">
        <div className="max-w-7xl mx-auto md:px-5">
          <Skeleton 
            width={160} 
            height={16} 
            baseColor="#374151" 
            highlightColor="#4B5563"
          />
        </div>
      </div>

      <div className="space-y-6 p-5">
        <Skeleton 
          height={200} 
          className="w-full rounded-2xl" 
          baseColor="#374151" 
          highlightColor="#4B5563"
        />
        
        <div className="space-y-2 md:py-5 py-5 text-center">
          <Skeleton 
            width="75%" 
            height={32} 
            className="mx-auto" 
            baseColor="#374151" 
            highlightColor="#4B5563"
          />
          <Skeleton 
            width="60%" 
            height={20} 
            className="mx-auto mt-2" 
            baseColor="#374151" 
            highlightColor="#4B5563"
          />
        </div>

        <div className="space-y-4 pb-10">
          {/* Form fields with lighter colors */}
          {[
            { label: 'Name', width: 60 },
            { label: 'Email', width: 60 },
            { label: 'Phone', width: 60 },
            { label: 'College', width: 70 },
            { label: 'Branch', width: 65 },
            { label: 'Year', width: 90 }
          ].map((field, index) => (
            <div key={index} className="space-y-2">
              <Skeleton 
                width={field.width} 
                height={16} 
                baseColor="#374151" 
                highlightColor="#4B5563"
              />
              <Skeleton 
                height={40} 
                className="w-full" 
                baseColor="#D1D5DB" 
                highlightColor="#E5E7EB"
              />
            </div>
          ))}

          {/* Submit button */}
          <Skeleton 
            height={40} 
            className="w-full mt-4" 
            baseColor="#D1D5DB" 
            highlightColor="#E5E7EB"
          />
        </div>
      </div>
    </div>
  );
}