import React from 'react';
import Pagination from 'rc-pagination';
import './PaginationComponent.scss';

const PaginationComponent = (props) => {

    const {  currentPage, totalItems, onChangePage } = props;

    return (
        <Pagination
            className="pagination"
            current={currentPage}
            total={totalItems}
            pageSize={20}
            onChange={onChangePage}
        />
    );
};

export default PaginationComponent;