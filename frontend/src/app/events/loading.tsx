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
            baseColor="#2D2D2D"  
            highlightColor="#474747" 
          />
        </div>
      </div>

      <div className="space-y-6 p-5">
        <div className="space-y-2 md:py-5 py-5 text-center">
          <Skeleton 
            width="75%" 
            height={32} 
            className="mx-auto" 
            baseColor="#2D2D2D" 
            highlightColor="#474747"
          />
          <Skeleton 
            width="60%" 
            height={20} 
            className="mx-auto mt-2" 
            baseColor="#2D2D2D" 
            highlightColor="#474747"
          />
        </div>

        <div className="space-y-4 pb-10">
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
                baseColor="#2D2D2D" 
                highlightColor="#474747"
              />
              <Skeleton 
                height={40} 
                className="w-full" 
                baseColor="#B0B0B0"  
                highlightColor="#C5C5C5"
              />
            </div>
          ))}

          <Skeleton 
            height={40} 
            className="w-full mt-4" 
            baseColor="#B0B0B0" 
            highlightColor="#C5C5C5"
          />
        </div>
      </div>
    </div>
  );
}
