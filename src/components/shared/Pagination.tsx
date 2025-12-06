// src/components/shared/Pagination.tsx
'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // اگر فقط یک صفحه داریم، pagination نمایش نمی‌دیم
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // محدود کردن تعداد صفحات نمایش داده شده
  let visiblePages = pages
  if (totalPages > 7) {
    if (currentPage <= 4) {
      visiblePages = [...pages.slice(0, 5), -1, totalPages]
    } else if (currentPage >= totalPages - 3) {
      visiblePages = [1, -1, ...pages.slice(totalPages - 5)]
    } else {
      visiblePages = [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages]
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* دکمه قبلی */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-xl border-2 border-red-900 flex items-center justify-center hover:bg-red-900 hover:text-yellow-200 transition disabled:opacity-30 disabled:cursor-not-allowed font-bold text-red-900"
        aria-label="صفحه قبل"
      >
        ‹
      </button>

      {/* شماره صفحات */}
      {visiblePages.map((page, index) => {
        // نقطه چین برای صفحات بین
        if (page === -1) {
          return (
            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-600 font-bold">
              ...
            </span>
          )
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl border-2 border-red-900 flex items-center justify-center transition font-bold ${
              currentPage === page
                ? 'bg-red-900 text-yellow-200'
                : 'text-red-900 hover:bg-red-900 hover:text-yellow-200'
            }`}
            aria-label={`صفحه ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* دکمه بعدی */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-xl border-2 border-red-900 flex items-center justify-center hover:bg-red-900 hover:text-yellow-200 transition disabled:opacity-30 disabled:cursor-not-allowed font-bold text-red-900"
        aria-label="صفحه بعد"
      >
        ›
      </button>
    </div>
  )
}
