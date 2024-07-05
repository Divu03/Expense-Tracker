export default (state, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: action.payload,
                loading:false
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                currentUser: null,
                loading:false
            };
        case 'SIGNUP_USER':
            return {
                ...state,
                currentUser: action.payload,
                loading:false
            };
        default:
            return state;
    }
};
