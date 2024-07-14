import React, { createContext, useReducer, useContext, useEffect } from "react";
import AppReducer from './AppReducer';
import { auth, firestore } from '../firebase/firebase';
import { collection, addDoc, doc, deleteDoc, getDoc, getDocs, query, orderBy, setDoc,limit, updateDoc } from "firebase/firestore";

const initialState = {
    transactions: [],
    income: 0,
    expense: 0,
    email: '',
    name: '',
    mobile: 0,
    balance: 0
};

export const AuthContext = createContext(initialState);

export const useAuth = () => {
    return useContext(AuthContext);
};

// Global context
export const GlobalContext = createContext(initialState);

export const useGlobal = () => {
    return useContext(GlobalContext);
};

// Global provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const currentUser = auth.currentUser;

    // Add Transaction
    const addTransaction = async(transaction) => {
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
                id:docRef.id,
                ...transaction,
                timestamp: new Date()
            };

            // Update local state
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: newTransaction
            });

        }catch(error){
            console.error("Error while adding transaction to firestore",error);
        }
    };

    // Delete Transaction
    const deleteTransaction = async(id, amount) => {
        if (!currentUser) return;

        try {
            const transactionRef = doc(firestore, 'users', String(currentUser.uid), 'transactions', String(id));

            await deleteDoc(transactionRef);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });

            console.log("deleted the record", String(currentUser.uid),String(id),String(amount));
        } catch (error) {
            console.error("Error deleting transaction: ", error);
        }
    };

    // Save Changes to Server
    const saveChanges = async () => {
        if (!currentUser) return;

        try {
            const userRef = doc(firestore, 'users', currentUser.uid);
            await updateDoc(userRef, {
                income: state.income,
                expense: state.expense
            });

        } catch (error) {
            console.error("Error saving changes: ", error);
        }
    };

    const calculateIncomeExpense = () => {
        const amounts = state.transactions.map(transaction => transaction.amount);
    
        const incomeLocal = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0)
            .toFixed(2);
    
        const expenseLocal = (
            amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1)
            .toFixed(2);
    
        dispatch({
            type: 'UPDATE_BALANCE',
            payload: { income: incomeLocal, expense: expenseLocal }
        });
        console.log(state.income,state.expense)
    };

    // fetch intial user data
    const fetchUserInitialData = async (currentUser) => {
        try {
            const userRef = doc(firestore, 'users', currentUser.uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();

            console.log("User data fetched:", userData);

            dispatch({
                type: 'SET_INITIAL_DATA',
                payload: {
                    income: userData.income,
                    expense: userData.expense,
                    email:userData.email,
                    name:userData.name,
                    mobile:userData.mobile
                }
            });


        } catch (error) {
            console.error("Error fetching initial data: ", error);
        }
    }

    // Fetch initial tansaction data
    useEffect(() => {
        const fetchInitialData = async () => {
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
                    type: 'SET_TRANSACTIONS',
                    payload: transactions
                });
            } catch (error) {
                console.error("Error fetching initial data: ", error);
            }
        };

        if (currentUser) {
            fetchInitialData();
        }
        console.log(state.name,state.email,state.mobile);
    }, []);

    // calculating income and expense
    useEffect(() => {
        if (state.transactions.length > 0) {
            calculateIncomeExpense();
        }
    }, [state.transactions]);

    // // Fetch 5
    // const fetchLastFiveTransactions = async () => {
    //     if (!currentUser) return;
    //         console.log("reached");
    //     try {
    //         const q = query(
    //             collection(firestore, 'users', currentUser.uid, 'transactions'),
    //             orderBy('timestamp', 'desc'),
    //             limit(5)
    //         );

    //         const querySnapshot = await getDocs(q);
    //         console.log(querySnapshot);
    //         const transactions = querySnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data()
    //         }));
    //         console.log(transactions);

    //         dispatch({
    //             type: 'SET_TRANSACTIONS',
    //             payload: transactions
    //         });
    //     } catch (error) {
    //         console.error("Error fetching last five transactions: ", error);
    //     }
    // };
    
    // //Fetch All
    // const fetchAllTransactions = async () => {
    //     if (!currentUser) return;

    //     try {
    //         const q = query(
    //             collection(firestore, 'users', currentUser.uid, 'transactions'),
    //             orderBy('timestamp', 'desc')
    //         );

    //         const querySnapshot = await getDocs(q);
    //         const transactions = querySnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data()
    //         }));

    //         dispatch({
    //             type: 'SET_ALL_TRANSACTIONS',
    //             payload: transactions
    //         });
            
    //     } catch (error) {
    //         console.error("Error fetching all transactions: ", error);
    //     }
    // };

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            balance: state.balance,
            income: state.income,
            expense: state.expense,
            name: state.name,
            mobile: state.mobile,
            email: state.email,
            addTransaction,
            deleteTransaction,
            saveChanges,
            fetchUserInitialData,
            // fetchAllTransactions,
            // fetchLastFiveTransactions
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
