export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden shimmer-bg">
      {/* Gradient Overlays matching real hero */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-transparent" />

      {/* Content Skeleton */}
      <div className="absolute inset-0 flex items-end pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Genres */}
            <div className="flex gap-2 mb-3">
              <div className="h-6 w-16 rounded-full shimmer-bg bg-white/10" />
              <div className="h-6 w-20 rounded-full shimmer-bg bg-white/10" />
            </div>

            {/* Title */}
            <div className="h-12 md:h-16 w-3/4 rounded-lg shimmer-bg bg-white/10 mb-4" />

            {/* Meta */}
            <div className="flex gap-4 mb-5">
              <div className="h-4 w-12 rounded shimmer-bg bg-white/10" />
              <div className="h-4 w-12 rounded shimmer-bg bg-white/10" />
            </div>

            {/* Overview */}
            <div className="space-y-2 mb-8">
              <div className="h-4 w-full rounded shimmer-bg bg-white/10" />
              <div className="h-4 w-5/6 rounded shimmer-bg bg-white/10" />
              <div className="h-4 w-4/6 rounded shimmer-bg bg-white/10" />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <div className="h-12 w-36 rounded-lg shimmer-bg bg-white/10" />
              <div className="h-12 w-36 rounded-lg shimmer-bg bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
