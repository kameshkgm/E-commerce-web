import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState({});
    const [orders, setOrders] = useState([]);

    const login = (userData) => {
        if (userData) {
            setLoggedIn(true);
            setName(userData.fullName || ''); // Set user details from userData
            setEmail(userData.email || '');
            setAddress(userData.address || {});
            setOrders(userData.orders || []);
        }
    };

    const logout = () => {
        setLoggedIn(false);
        setName('');
        setEmail('');
        setAddress({});
        setOrders([]);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, name, email, address, orders, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
