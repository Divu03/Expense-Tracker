//user screen with user details and menu optionsimport React from 'react';

const User = ({ onLogout, onViewHistory }) => {
    return (
        <div>
            {/* User details and other content */}
            <button onClick={onLogout}>Logout</button>
            <button onClick={onViewHistory}>View History</button>
        </div>
    );
};

export default User;
