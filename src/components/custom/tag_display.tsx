import { Badge } from "@/components/ui/badge";
import type Tag from "@/model/Tag";
import { cn } from "@/lib/utils";

interface TagDisplayProps {
    tags: Tag[];
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
                const tagColor = tag.color || "#7c3aed";

                const customStyle = {
                    backgroundColor: tagColor.length === 9 ? tagColor : `${tagColor}33`,
                    color: tagColor.substring(0, 7),
                    borderColor: `${tagColor.substring(0, 7)}80`,
                    borderWidth: '1px'
                };

                return (
                    <Badge
                        key={index}
                        variant={variant}
                        style={customStyle}
                        className={cn(
                            "transition-colors",
                            size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
                            badgeClassName
                        )}
                    >
                        {tag.name}
                    </Badge>
                );
            })}
        </div>
    );
}
