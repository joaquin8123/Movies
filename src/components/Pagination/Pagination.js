import React from 'react'
import './Pagination.scss'
import Pagination from 'rc-pagination'


export const PaginationMovies = (props) => {
  const { currentPage, totalItems, onChangePage } = props;

  return (
    <Pagination
      className="pagination"
      current={currentPage}
      total={totalItems}
      pageSize={20}
      onChange={onChangePage}
    />
  );
}
