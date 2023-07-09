import { createContext, useState } from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [Page, setPage] = useState(1);

  return (
    <PaginationContext.Provider value={{ Page, setPage }}>
      {children}
    </PaginationContext.Provider>
  );
};
