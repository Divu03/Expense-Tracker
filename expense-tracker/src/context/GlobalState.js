import React, { createContext, useReducer} from "react";
import AppReducer from './AppReducer';
import { auth, firestore } from '../firebase/firebase';
import { collection, addDoc, doc,deleteDoc } from "firebase/firestore";


const initialState = {
    transactions: []
};

// Global context
export const GlobalContext = createContext(initialState);

// Global provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const currentUser = auth.currentUser;

    const addTransaction = async (transaction) => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        try {
            const docRef = await addDoc(
                collection(firestore, 'users', currentUser.uid, 'transactions'), 
                {
                    ...transaction,
                    timestamp: new Date()
                }
            );
            transaction.id = docRef.id;

            const newTransaction = {
                id: docRef.id,
                ...transaction
            };

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: newTransaction
            });
        } catch (error) {
            console.error("Error adding transaction: ", error);
        }
    };

    const deleteTransaction = async (id) => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        try {
            const transactionRef = doc(firestore, 'users', String(currentUser.uid), 'transactions', String(id));
            console.log('Deleting document at:', transactionRef.path); // Log the document path

            await deleteDoc(transactionRef);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (error) {
            console.error("Error deleting transaction: ", error);
        }
    };

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            addTransaction,
            deleteTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
