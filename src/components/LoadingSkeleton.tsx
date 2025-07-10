import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 h-56 rounded-xl mb-4"></div>
          <div className="space-y-3">
            <div className="bg-gray-200 h-6 rounded"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            <div className="bg-gray-200 h-8 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
} 