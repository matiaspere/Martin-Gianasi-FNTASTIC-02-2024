import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoader() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-3 mb-10">
        <Skeleton className="h-12 w-12 " />
        <Skeleton className="h-12 w-12 " />
        <Skeleton className="h-12 w-12 " />
        <Skeleton className="h-12 w-12 " />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-auto" />
        <Skeleton className="h-4 w-auto" />
        <Skeleton className="h-4 w-auto" />
        <Skeleton className="h-4 w-auto" />
        <Skeleton className="h-4 w-auto" />
        <Skeleton className="h-4 w-auto" />
      </div>
    </div>
  );
}
