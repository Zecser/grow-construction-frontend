import { Skeleton } from "@/components/ui/skeleton";

export default function ServicePageSkeleton() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section Skeleton */}
      <section className="relative w-full aspect-[3/1] bg-gray-200 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 w-[90%] text-start text-white p-8 space-y-4">
          <Skeleton className="h-10 w-2/3 bg-gray-400/50" />
          <Skeleton className="h-4 w-1/2 bg-gray-400/40" />
        </div>
      </section>

      {/* Service Highlights Skeleton */}
      <div className="bg-gray-100 py-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Image + Description Skeleton */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10 items-center">
        <Skeleton className="w-full h-72 max-w-md rounded-2xl" />
        <div className="border-2 border-dashed border-gray-300 rounded-2xl shadow-md p-8 bg-white space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>

      {/* What We Offer Skeleton */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <Skeleton className="h-8 w-40 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow-md p-6 space-y-3"
            >
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/6" />
            </div>
          ))}
        </div>
      </section>

      {/* Why Us Skeleton */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-8 w-32 mb-10" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 space-y-3">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-8 w-40 mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </section>
    </div>
  );
}
