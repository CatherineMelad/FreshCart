export default function ProductSkeleton({ count = 8 }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5" aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md"
        >
          <div className="h-64 bg-gray-200" />
          <div className="space-y-3 p-6">
            <div className="h-3 w-1/4 rounded bg-gray-200" />
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-10 w-full rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
