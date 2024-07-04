import React,{ createContext, useReducer } from "react";
import AppReducer from './AppReducer'

const intialState ={
    transactions : [
        { id: 1, text: 'Flower', amount: -20 },
        { id: 2, text: 'Salary', amount: 300 },
        { id: 3, text: 'Book', amount: -10 },
        { id: 4, text: 'Camera', amount: 150 }
    ]
}

//Global context
    export const GlobalContext = createContext(intialState)

//Global provider

export const GlobalProvider = ({children}) => {
    
    const[state,dispatch] =useReducer(AppReducer,intialState)
    
    //Action
    function deleteTransaction(id) {
        dispatch({
            type : 'DELETE_TRANSACTION',
            payload : id
        });
    }
    
    return(
        <GlobalContext.Provider value = {{
            transactions : state.transactions,
            deleteTransaction
        }}>{children}
        </GlobalContext.Provider>
    );
}