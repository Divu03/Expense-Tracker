import React, { createContext, useReducer} from "react";
import AppReducer from './AppReducer';
import { auth, firestore } from '../firebase/firebase';
import { collection, addDoc, doc, deleteDoc, getDocs, query, orderBy, limit } from "firebase/firestore";


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
        if (!currentUser) return;

        try {
            const transactionRef = doc(firestore, 'users', String(currentUser.uid), 'transactions', String(id));

            await deleteDoc(transactionRef);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (error) {
            console.error("Error deleting transaction: ", error);
        }
    };
    
    const fetchLastFiveTransactions = async () => {
        if (!currentUser) return;

        try {
            const q = query(
                collection(firestore, 'users', currentUser.uid, 'transactions'),
                orderBy('timestamp', 'desc'),
                limit(5)
            );

            const querySnapshot = await getDocs(q);
            const transactions = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            dispatch({
                type: 'SET_TRANSACTIONS',
                payload: transactions
            });
        } catch (error) {
            console.error("Error fetching last five transactions: ", error);
        }
    };

    const fetchAllTransactions = async () => {
        if (!currentUser) return;

        try {
            const q = query(
                collection(firestore, 'users', currentUser.uid, 'transactions'),
                orderBy('timestamp', 'desc')
            );

            const querySnapshot = await getDocs(q);
            const transactions = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            dispatch({
                type: 'SET_ALL_TRANSACTIONS',
                payload: transactions
            });
            
        } catch (error) {
            console.error("Error fetching all transactions: ", error);
        }
    };

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            addTransaction,
            deleteTransaction,
            fetchLastFiveTransactions,
            fetchAllTransactions
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
