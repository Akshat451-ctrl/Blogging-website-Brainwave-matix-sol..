// src/components/ui/Skeleton.jsx
export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md ${className}`}
    />
  );
}
