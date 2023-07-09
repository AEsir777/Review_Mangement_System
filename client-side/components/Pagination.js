import Pagination from '@mui/material/Pagination';
import React from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { PaginationContext } from '../contexts/paginationContext';
import styles from '../styles/Search.module.css';
// then in your component:

function PaginationComponent({totalCount}) {
  const {Page, setPage} = useContext(PaginationContext);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const totalPageCount = Math.ceil(totalCount / 10);

  return (
    <div>
      <Pagination 
        count={totalPageCount} 
        page={Page} 
        onChange={handleChange}
        className={styles.pagination}
      />
    </div>
  );

}

export default PaginationComponent;