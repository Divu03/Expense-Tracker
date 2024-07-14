export default (state, action) => {
    switch(action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
                balance: state.balance - action.payload.amount,
                income: action.payload.amount > 0 ? state.income - action.payload.amount : state.income,
                expense: action.payload.amount < 0 ? state.expense - action.payload.amount : state.expense
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
                balance: state.balance + action.payload.amount,
                income: action.payload.amount > 0 ? state.income + action.payload.amount : state.income,
                expense: action.payload.amount < 0 ? state.expense + action.payload.amount : state.expense
            };
        // case 'ADD_INCOME':
        //     return {
        //         ...state,
        //         income: state.income + action.payload,
        //     };
        // case 'ADD_EXPENSE':
        //     return {
        //         ...state,
        //         expense: state.expense + action.payload
        //     };
        case 'SET_INITIAL_DATA':
            console.log("Setting initial data:", action.payload);
            return {
                ...state,
                income: action.payload.income,
                expense: action.payload.expense,
                email: action.payload.email,
                name: action.payload.name,
                mobile: action.payload.mobile
            };
        case 'SET_TRANSACTIONS':
            return {
                ...state,
                transactions: action.payload
            };
        // case 'SET_ALL_TRANSACTIONS':
        //     return {
        //         ...state,
        //         transactions: action.payload
        //    };
        case 'UPDATE_BALANCE':
            return {
                ...state,
                income: action.payload.income,
                expense: action.payload.expense
            };
        default:
            return state;
    }
};
