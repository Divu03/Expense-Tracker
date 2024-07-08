import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { History } from "./components/History";
import { AuthProvider, useAuth } from "./context/AuthState";
import ProtectedRoute from "./components/ProtectedRoute";
import { GlobalProvider } from "./context/GlobalState";

import './App.css';

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <AppContent />
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

const AppContent = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <>
      <Header onLogout={handleLogout} onViewHistory={handleViewHistory} />
      <div className="container">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
};

const Home = () => (
  <>
    <Balance />
    <IncomeExpenses />
    <AddTransaction />
    <TransactionList />
  </>
);

export default App;
