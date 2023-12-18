import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ currentPage, totalPage, onPageChange }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container">
            <ul className="pagination">
                <li
                    className={`page-item ${
                        currentPage === 1 ? 'disabled' : ''
                    }`}
                >
                    <button
                        className="btn "
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
                            className="btn"
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li
                    className={`page-item ${
                        currentPage === totalPage ? 'disabled' : ''
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

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
