import React from 'react';
import { Pagination as MuiPagination, PaginationItem } from '@mui/material';
import { LastPage } from '@mui/icons-material';

interface PaginationProps {
  page: number;
  lastPage: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, lastPage, onChange }) => {
  return (
    <MuiPagination
      count={lastPage}
      page={page}
      onChange={onChange}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            backgroundColor: '#BCE784',
            color: '#313638',
            '&:hover': {
              backgroundColor: '#A8D88C', 
            },
            '&.Mui-selected': {
              backgroundColor: '#FF9914',
              color: '#313638',
            },
          }}
        />
      )}
    />
  );
};

export { Pagination }