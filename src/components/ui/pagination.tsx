import { Button } from "./button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const showEllipsis = totalPages > 7

  const renderPageNumbers = () => {
    const pages = []
    
    if (!showEllipsis) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(i)}
            className={cn(
              "h-8 w-8 p-0",
              currentPage === i && "bg-white text-black"
            )}
          >
            {i}
          </Button>
        )
      }
    } else {
      // Show first page, ellipsis, current page neighbors, ellipsis, last page
      pages.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(1)}
          className={cn(
            "h-8 w-8 p-0",
            currentPage === 1 && "bg-white text-black"
          )}
        >
          1
        </Button>
      )

      if (currentPage > 3) {
        pages.push(
          <Button
            key="ellipsis-start"
            variant="outline"
            size="sm"
            disabled
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(i)}
            className={cn(
              "h-8 w-8 p-0",
              currentPage === i && "bg-white text-black"
            )}
          >
            {i}
          </Button>
        )
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <Button
            key="ellipsis-end"
            variant="outline"
            size="sm"
            disabled
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )
      }

      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(totalPages)}
          className={cn(
            "h-8 w-8 p-0",
            currentPage === totalPages && "bg-white text-black"
          )}
        >
          {totalPages}
        </Button>
      )
    }

    return pages
  }

  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {renderPageNumbers()}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}