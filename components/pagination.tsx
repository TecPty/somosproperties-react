"use client"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-[#cccccc] rounded-lg text-[#333333] hover:border-[#3898EC] hover:text-[#3898EC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[#cccccc] disabled:hover:text-[#333333]"
        aria-label="Página anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            page === currentPage
              ? "bg-[#3898EC] text-white"
              : page === "..."
                ? "text-[#999999] cursor-default"
                : "border border-[#cccccc] text-[#333333] hover:border-[#3898EC] hover:text-[#3898EC]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-[#cccccc] rounded-lg text-[#333333] hover:border-[#3898EC] hover:text-[#3898EC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[#cccccc] disabled:hover:text-[#333333]"
        aria-label="Página siguiente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
