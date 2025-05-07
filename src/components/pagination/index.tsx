import { ChevronButton, PageButton } from "./page-buttons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Add current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Sort and deduplicate
    return [...new Set(pages)].sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-1">
        <ChevronButton
          direction="left"
          currentPage={currentPage}
          totalPages={totalPages}
        />

        {pageNumbers.map((page, index) => {
          // Add ellipsis if there's a gap
          const previousPage = pageNumbers[index - 1];
          if (previousPage && page - previousPage > 1) {
            return (
              <span
                key={`ellipsis-${page}`}
                className="px-3 py-2 text-slate-400"
              >
                ...
              </span>
            );
          }

          return <PageButton key={page} page={page} />;
        })}

        <ChevronButton
          direction="right"
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </nav>
    </div>
  );
}
