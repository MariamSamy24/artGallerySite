import React from 'react';

const Pagination = ({ page, setPage, hasProducts }) => {
  return (
    <div className="mt-4">
      <button
        onClick={() => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))}
        disabled={page === 1}
        className={`bg-gray-300 px-4 py-2 rounded ml-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Previous
      </button>
      <button 
        onClick={() => setPage((prevPage) => prevPage + 1)} 
        disabled={!hasProducts}
        className={`bg-gray-300 px-4 py-2 rounded ml-2 ${!hasProducts ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
