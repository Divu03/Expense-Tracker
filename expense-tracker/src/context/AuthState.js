import React, { createContext, useReducer, useEffect, useContext } from "react";
import { auth, firestore } from '../firebase/firebase';
import AuthReducer from './AuthReducer';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const initialState = {
    currentUser: null,
    loading: true
};

export const AuthContext = createContext(initialState);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const userData = {
                    email: user.email,
                    uid: user.uid
                };
                dispatch({
                    type: 'LOGIN_USER',
                    payload: userData
                });
            } else {
                dispatch({
                    type: 'LOGOUT_USER'
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const loginUser = async (user) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            const userData = {
                email: userCredential.user.email,
                uid: userCredential.user.uid
            };
            dispatch({
                type: 'LOGIN_USER',
                payload: userData
            });
        } catch (error) {
            console.error("Error logging in", error);
            // Handle error state or display error message
        }
    };

    const logoutUser = async () => {
        try {
            await signOut(auth);
            dispatch({
                type: 'LOGOUT_USER'
            });
        } catch (error) {
            console.error("Error logging out", error);
            // Handle error state or display error message
        }
    };

    const signupUser = async (user) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const userData = {
                email: userCredential.user.email,
                uid: userCredential.user.uid
            };
    
            const currentDate = new Date();
            const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
    
            await setDoc(doc(firestore, 'users', userData.uid), {
                email: userData.email,
                name: user.name,
                date: formattedDate,
                mobile: user.mobile
            });
    
            dispatch({
                type: 'SIGNUP_USER',
                payload: userData
            });
        } catch (error) {
            console.error("Error signing up", error);
            // Handle error state or display error message
        }
    };

    return (
        <AuthContext.Provider value={{
            currentUser: state.currentUser,
            loading: state.loading,
            loginUser,
            logoutUser,
            signupUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};
