import { Skeleton } from "@/components/ui/skeleton"
const Loading = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 mt-10">
            <Skeleton className="w-1/4 my-2 h-5 rounded-lg" />
            {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="w-full my-2 h-8 rounded-lg" />
            ))}
            <div className="grid grid-cols-3 gap-4 my-4  ">
                {Array.from({ length: 9 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-48 rounded-lg shadow-md" />
                ))}
            </div>
        </div>
    )
}

export default Loading