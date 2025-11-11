import { Skeleton } from "@/components/ui/skeleton";

export function ChannelListSkeleton() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MessageListSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={`flex ${i % 3 === 0 ? "justify-end" : ""} gap-3`}>
          {i % 3 !== 0 && <Skeleton className="h-8 w-8 rounded-full" />}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className={`h-16 ${i % 3 === 0 ? "w-64" : "w-80"} rounded-lg`} />
          </div>
        </div>
      ))}
    </div>
  );
}
