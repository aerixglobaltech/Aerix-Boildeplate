import { Skeleton } from '@/components/ui/Loader';

export default function UsersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <div className="rounded-xl border border-gray-200 bg-white">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-gray-100 px-6 py-4 last:border-0">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
