import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [curentUser, setCurentUser] = useState(undefined); // שים לב: undefined (לא null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('curentUser');
    if (savedUser) {
      setCurentUser(JSON.parse(savedUser));
    } else {
      setCurentUser(null); // לא מחובר
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (curentUser) {
      localStorage.setItem('curentUser', JSON.stringify(curentUser));
    } else {
      localStorage.removeItem('curentUser');
    }
  }, [curentUser]);

  return (
    <DataContext.Provider value={{ curentUser, setCurentUser, isLoading }}>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataContext;
