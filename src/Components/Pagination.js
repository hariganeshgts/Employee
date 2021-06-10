import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export default function Pagination({handleChangePage,handleChangeRowsPerPage,page,rowsPerPage, values}) {
    
    
  
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={-1}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}