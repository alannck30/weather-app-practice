import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function AdditionalInfoSkeleton() {
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex justify-between" key={index}>
          <div className="flex gap-4">
            <Skeleton className="w-20 h-8 " />
            <Skeleton className="size-8 rounded-full" />
          </div>
          <Skeleton className="size-8" />
        </div>
      ))}
    </Card>
  );
}
