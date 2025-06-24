import { useState } from 'react';

export const useFilters = (initialFilters) => {
  // Your custom hook logic here
  const [filters, setFilters] = useState(initialFilters);

      const changeFilters = (key, value) => {
          setFilters(prev => {
              return {...prev, [key]: value}
          })
      };

   return {
       filters,
       changeFilters
   };
};