import React from 'react';
import Link from "next/link"

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto mb-20 w-full">
      <h1 className="select-none text-center text-3xl md:text-4xl font-semibold md:pb-16 pb-10">
        <div className="h-8 bg-gray-300 rounded animate-pulse w-1/4 mx-auto"></div>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <div
            key={index}
            className="relative flex flex-col transition-shadow duration-300 rounded-xl"
          >
            <div className="event_card border-white/10 border rounded-xl p-6 bg-background h-[350px]">
              <div className="animate-pulse space-y-4">
                <div className="bg-gray-300 h-40 w-full rounded-md"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}