import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator";
import type {Practice} from "@/model/Practice.ts";
import {getUserPractice} from "@/lib/api.ts";
import PracticeCard from "@/components/custom/practice_card.tsx";
import { Pagination } from "@/components/ui/pagination.tsx";

export default function PastPracticeSection() {
  const [practices, setPractices] = useState<Practice[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fetchPractices = (page: number) => {
    setIsLoading(true)
    
    getUserPractice(10, page-1)
      .then(page => {
        setPractices(page.content)
        setTotalPages(page.totalPages)
      })
      .catch(error => console.error("Failed to fetch practices:", error))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchPractices(1)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchPractices(page)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* === Header === */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Past Practices</h1>
          <p className="text-zinc-400 mt-1">Review your completed and ongoing practice sessions</p>
        </div>
      </div>

      <Separator className="bg-zinc-800"/>

      {/* === Practice List === */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-12 text-zinc-400">
            <p className="text-lg">Loading practices...</p>
          </div>
        ) : practices.length > 0 ? (
          <>
            {practices.map((practice, index) => (
              <PracticeCard key={index} practice={practice}/>
            ))}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-zinc-400">
            <p className="text-lg">No practices found</p>
            <p className="text-sm mt-2">Start a practice session to see it here</p>
          </div>
        )}
      </div>
    </div>
  )
}
