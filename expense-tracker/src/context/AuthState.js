import React, { createContext, useReducer, useEffect, useContext } from "react";
import { auth, firestore } from '../firebase/firebase';
import AuthReducer from './AuthReducer';
import { signInWithEmailAndPassword, signOut,createUserWithEmailAndPassword} from "firebase/auth";

const initialState = {
    currentUser: null,
    loading:true
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContext = createContext(initialState);

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
            const userCredential = await signInWithEmailAndPassword(auth,user.email, user.password);
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
        }
    };

    const signupUser = async (user) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth,user.email, user.password);
            const userData = {
                email: userCredential.user.email,
                uid: userCredential.user.uid
            };
            await firestore.collection('users').doc(userData.uid).set({
                email: userData.email,
                name:user.name,
                date:user.date,
                mobile:user.mobile
            });
            dispatch({
                type: 'SIGNUP_USER',
                payload: userData
            });
        } catch (error) {
            console.error("Error signing up", error);
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
