// app/loading.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#1e4620]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#1e4620]/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto pt-10 relative z-10">
        {/* Header with logos */}
        <div className="flex justify-center space-x-4 mb-8">
          <Skeleton 
            circle
            width={50} 
            height={50} 
            baseColor="#1e4620" 
            highlightColor="#2c5c2e"
          />
          <Skeleton 
            circle
            width={50} 
            height={50} 
            baseColor="#1e4620" 
            highlightColor="#2c5c2e"
          />
        </div>

        {/* "Presents" text */}
        <div className="text-center mb-6">
          <Skeleton 
            width={80} 
            height={20} 
            className="mx-auto" 
            baseColor="#374151" 
            highlightColor="#4B5563"
          />
        </div>

        {/* DevHost Logo Area */}
        <div className="text-center mb-10">
          <Skeleton 
            width={300} 
            height={80} 
            className="mx-auto" 
            baseColor="#1e4620" 
            highlightColor="#2c5c2e"
          />
          <Skeleton 
            width={240} 
            height={16} 
            className="mx-auto mt-4" 
            baseColor="#374151" 
            highlightColor="#4B5563"
          />
        </div>

        {/* Registration Form */}
        <div className="space-y-6 p-5 bg-black/30 rounded-lg backdrop-blur-sm">
          <div className="text-center mb-8">
            <Skeleton 
              width="60%" 
              height={28} 
              className="mx-auto" 
              baseColor="#374151" 
              highlightColor="#4B5563"
            />
          </div>

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
                baseColor="#1e4620" 
                highlightColor="#2c5c2e"
              />
            </div>
          ))}

          {/* Submit button */}
          <div className="pt-4">
            <Skeleton 
              height={48} 
              className="w-full rounded-full" 
              baseColor="#1e4620" 
              highlightColor="#2c5c2e"
            />
          </div>
        </div>
      </div>
    </div>
  );
}