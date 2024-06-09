import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/Config";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe();
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setIsLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        isLoading
    };

    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}
