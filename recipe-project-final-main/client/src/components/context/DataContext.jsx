import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [curentUser, setCurentUser] = useState(() => {
        const savedUser = localStorage.getItem('curentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (curentUser) {
            localStorage.setItem('curentUser', JSON.stringify(curentUser));
        } else {
            localStorage.removeItem('curentUser');
        }
    }, [curentUser]);

    return (
        <DataContext.Provider value={{ curentUser, setCurentUser }}>
            {children}
        </DataContext.Provider>
    );
}

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DataContext;
