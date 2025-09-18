'use client';

import React from 'react';

interface LoadingAnimationProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  type = 'spinner',
  size = 'md',
  color = 'primary',
  className = ''
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'secondary':
        return 'text-gold-500';
      case 'white':
        return 'text-white';
      default:
        return 'text-blue-600';
    }
  };

  const renderSpinner = () => (
    <div className={`${getSizeClasses()} ${getColorClasses()} ${className}`}>
      <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );

  const renderDots = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'} 
                     ${getColorClasses()} bg-current rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`${getSizeClasses()} ${getColorClasses()} ${className}`}>
      <div className="w-full h-full bg-current rounded-full animate-ping opacity-75" />
    </div>
  );

  const renderWave = () => (
    <div className={`flex items-end space-x-1 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-1' : size === 'lg' ? 'w-2' : 'w-1.5'} 
                     ${getColorClasses()} bg-current rounded-sm animate-pulse`}
          style={{
            height: size === 'sm' ? '8px' : size === 'lg' ? '24px' : '16px',
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s',
            transformOrigin: 'bottom'
          }}
        />
      ))}
    </div>
  );

  const renderSkeleton = () => (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );

  switch (type) {
    case 'dots':
      return renderDots();
    case 'pulse':
      return renderPulse();
    case 'wave':
      return renderWave();
    case 'skeleton':
      return renderSkeleton();
    default:
      return renderSpinner();
  }
};

// Page Loading Overlay Component
interface PageLoadingProps {
  isLoading: boolean;
  message?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ 
  isLoading, 
  message = 'Loading...' 
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-blue-900/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingAnimation type="spinner" size="lg" color="white" className="mx-auto mb-4" />
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
export type { LoadingAnimationProps, PageLoadingProps };