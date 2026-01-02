import { Badge } from "@/components/ui/badge";
import type Tag from "@/model/Tag";
import { cn } from "@/lib/utils";

interface TagDisplayProps {
    tags: Tag[] | string[];
    className?: string;
    badgeClassName?: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    size?: "sm" | "md";
}

export default function TagDisplay({
    tags,
    className,
    badgeClassName,
    variant = "secondary",
    size = "md",
}: TagDisplayProps) {
    if (!tags || tags.length === 0) return null;

    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {tags.map((tag, index) => {
                const tagName = typeof tag === "string" ? tag : tag.name;
                return (
                    <Badge
                        key={index}
                        variant={variant}
                        className={cn(
                            "transition-colors",
                            size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
                            variant === "secondary" && "bg-violet-900/30 text-violet-300 border-violet-800/50 hover:bg-violet-900/50",
                            badgeClassName
                        )}
                    >
                        {tagName}
                    </Badge>
                );
            })}
        </div>
    );
}
