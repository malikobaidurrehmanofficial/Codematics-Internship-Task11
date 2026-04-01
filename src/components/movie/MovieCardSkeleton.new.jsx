export default function MovieCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-40">
      <div className="w-full h-64 rounded-2xl bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer" />
      <div className="mt-3 h-4 rounded bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer" />
    </div>
  );
}
