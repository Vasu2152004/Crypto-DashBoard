import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton-dark rounded-lg',
        className
      )}
    />
  );
}

export function CoinTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="glass rounded-lg p-4 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-4 bg-gray-700 rounded"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div>
                <div className="w-24 h-4 bg-gray-700 rounded mb-2"></div>
                <div className="w-12 h-3 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="w-20 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-16 h-3 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CoinCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="glass rounded-xl p-6 animate-pulse"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-6 bg-gray-700 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          </div>

          {/* Coin Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div className="flex-1">
              <div className="w-20 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-12 h-3 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="w-24 h-6 bg-gray-700 rounded mb-2"></div>
            <div className="w-16 h-4 bg-gray-700 rounded"></div>
          </div>

          {/* Market Data */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="w-16 h-3 bg-gray-700 rounded"></div>
              <div className="w-20 h-3 bg-gray-700 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-20 h-3 bg-gray-700 rounded"></div>
              <div className="w-16 h-3 bg-gray-700 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-24 h-3 bg-gray-700 rounded"></div>
              <div className="w-20 h-3 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-16" />
        ))}
      </div>
      <div className="chart-container">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
} 