import React from 'react';

const Pagination = ({ page, totalPage, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPage) {
      onPageChange(newPage);
    }
  };

  return (
    <nav className="flex justify-center mt-4" aria-label="pagination">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 0}
        className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-400"
      >
        &lt; Prev
      </button>
      {Array.from({ length: totalPage }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index)}
          className={`px-3 py-1 border border-gray-300 rounded-md mx-1 ${page === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPage - 1}
        className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-400"
      >
        Next &gt;
      </button>
    </nav>
  );
};

export default Pagination;
