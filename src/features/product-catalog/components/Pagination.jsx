import { MAX_PAGES_DISPLAYED } from '@/features/product-catalog/constants';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const leftOffset = Math.floor(MAX_PAGES_DISPLAYED / 2);
    let start = Math.max(currentPage - leftOffset, 1);
    let end = Math.min(start + MAX_PAGES_DISPLAYED - 1, totalPages);

    if (end - start + 1 < MAX_PAGES_DISPLAYED) {
      start = Math.max(end - MAX_PAGES_DISPLAYED + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4" data-testid="pagination-container">

      <button
        className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >Previous</button>

      {getPageNumbers().map(page => (
        <button
          key={page}
          className={`rounded px-4 py-2 ${
            currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => onPageChange(page)}
        >{page}</button>
      ))}

      <select
        className="rounded bg-gray-200 px-4 py-2 outline-none"
        value={currentPage}
        onChange={(e) => onPageChange(Number(e.target.value))}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <option key={page} value={page}>Page {page}</option>
        ))}
      </select>

      <button
        className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >Next</button>

    </div>
  );
}
