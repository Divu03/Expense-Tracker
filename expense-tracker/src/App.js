import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { AuthProvider } from "./context/AuthState";
import ProtectedRoute from "./components/ProtectedRoute";

import './App.css';
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

const Home = () => (
  <GlobalProvider>
    <Balance />
    <IncomeExpenses />
    <AddTransaction />
    <TransactionList />
  </GlobalProvider>
);

export default App;
