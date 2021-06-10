import React, { useState } from "react";

  function usePagination(values, rowsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(values.length / rowsPerPage);

  function currentData() {
    const begin = (currentPage - 1) *rowsPerPage;
    const end = begin + rowsPerPage;
   return values.slice(begin, end);
  }

 function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
 }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return (
    <div>
      
    </div>
  );
}

 export default usePagination;