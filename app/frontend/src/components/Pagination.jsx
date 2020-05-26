import React from 'react'

const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {
  const pagesCount = Math.ceil(length / itemsPerPage)
  const pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div className="">
      <ul className="pagination pagination-sm d-flex justify-content-center">
        <li className={`page-item${currentPage === 1 && ' disabled'}`}>
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`page-item${currentPage === page && ' active'}`}
          >
            <a onClick={() => onPageChanged(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item${currentPage === pagesCount && ' disabled'}`}>
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  )
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage
  return items.slice(start, start + itemsPerPage)
}

export default Pagination
