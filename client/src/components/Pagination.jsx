import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ButtonGroup mt={4} spacing="4" justifyContent="center" marginTop={'50px'}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>
             {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          onClick={() => onPageChange(index + 1)}
          colorScheme={currentPage === index + 1 ? 'blackAlpha' : 'green'}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
