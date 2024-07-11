import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import { logPageView } from './analytics';

import './App.css';

function App() {

  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);


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
          <Route path="/history" element={<GlobalProvider><ProtectedRoute><History /></ProtectedRoute></GlobalProvider>} />
        </Routes>
      </div>
    </>
  );
};

const Home = () => (
  <GlobalProvider>
    <Balance />
    <IncomeExpenses />
    <AddTransaction />
    <TransactionList />
  </GlobalProvider>
);

export default App;
