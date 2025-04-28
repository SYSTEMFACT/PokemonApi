function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    return (
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="flex items-center justify-center text-xl">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    );
  }
  
  export default Pagination;