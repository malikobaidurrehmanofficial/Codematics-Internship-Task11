import { classNames } from '../../utils/helpers';

function SkeletonCard({ compact }) {
  return (
    <div className={classNames('shrink-0', compact ? 'w-[180px] sm:w-[200px] lg:w-[216px]' : 'w-full')}>
      <div className="surface-card overflow-hidden rounded-2xl border border-app shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
        <div className="shimmer aspect-[2/3] w-full" />
        <div className="space-y-3 p-4">
          <div className="shimmer h-4 w-3/4 rounded-full" />
          <div className="shimmer h-3 w-1/2 rounded-full" />
          <div className="shimmer h-10 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function MovixMovieSkeleton({ count = 1, compact = false }) {
  return Array.from({ length: count }).map((_, index) => (
    <SkeletonCard key={`movie-skeleton-${compact ? 'compact' : 'grid'}-${index}`} compact={compact} />
  ));
}
