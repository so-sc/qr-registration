import React from 'react';
import Link from "next/link"

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto md:pt-5 pt-10">
      <div className="fixed top-0 left-0 border-white/10 bg-background z-50 w-full p-5 py-7 border-b">
        <div className="max-w-7xl mx-auto md:px-5">
          <Link href="/">
            <div className="w-40 h-4 bg-gray-300 rounded animate-pulse"></div>
          </Link>
        </div>
      </div>

      <div className="space-y-6 p-5">
        <div className="w-full h-40 bg-gray-300 rounded-2xl animate-pulse"></div>
        
        <div className="space-y-2 md:py-5 py-5 text-center">
          <div className="h-8 bg-gray-300 rounded animate-pulse w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2 mx-auto"></div>
        </div>

        <div className="space-y-4 pb-10">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded animate-pulse w-full"></div>
            </div>
          ))}
          
          <div className="h-10 bg-gray-300 rounded animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  );
}