export default function MovieSkeleton() {
  return (
    <div className="flex-shrink-0 w-full">
      <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-gray-800">
        <div className="shimmer w-full h-full" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded-md shimmer" />
        <div className="h-3 w-1/2 rounded-md shimmer" />
      </div>
    </div>
  );
}
