import React from 'react';
// import PropTypes from 'prop-types';

function Pagination({ currentPage, totlePage, onPageChange }) {
    const pageNumbers = [];

    for (let i = 1; i <= totlePage; i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="conatiner">
            <ul>
                <li
                    key={number}
                    className={`page-item ${
                        currentPage === 1 ? 'disabled' : ''
                    }`}
                >
                    <button
                        className="btn btn-light"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page-item ${
                            number === currentPage ? 'active' : ''
                        }`}
                    >
                        <button
                            className="btn btn-primary"
                            onClick={() => onPageChange(number)}
                        >
                            Next
                        </button>
                    </li>
                ))}
                <li
                    key={number}
                    className={`page-item ${
                        currentPage === totlePage ? 'disabled' : ''
                    }`}
                >
                    <button
                        className="btn btn-primary"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;
