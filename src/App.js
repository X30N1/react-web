import { useState, useEffect } from 'react';
import './App.css';
import Income from './components/income';
import Expenses from './components/expenses';
import Transactions from './components/Transactions';
import AddTransactionModal from './components/AddTransactionModal';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Reset states when user logs in
    setIncome(0);
    setExpenses(0);
    setTransactions([]);
    // Fetch new transactions for the logged-in user
    fetchTransactions();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/fetch', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      const items = data.items || [];
      setTransactions(items);

      // Calculate income and expenses
      const currentMonth = new Date().getMonth() + 1;
      const monthlyTransactions = items.filter(t => {
        const transactionDate = new Date(t.date);
        const transactionMonth = transactionDate.getMonth() + 1;
        return transactionMonth === currentMonth;
      });

      const monthlyIncome = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const monthlyExpenses = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      setIncome(monthlyIncome);
      setExpenses(monthlyExpenses);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Reset states on error
      setIncome(0);
      setExpenses(0);
      setTransactions([]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchTransactions();
    }
  }, []);

  if (!isAuthenticated) {
    if (isRegistering) {
        return <Register 
            onSwitchToLogin={() => setIsRegistering(false)} 
        />;
    }
    return <Login 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setIsRegistering(true)}
    />;
  }

  return (
    <div className="App">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Wyloguj</button>
      </div>
      <div className="dashboard-layout">
        <div className="left-column">
          <Income income={income} />
          <Expenses expenses={expenses} />
          <button 
            className="add-transaction-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Dodaj transakcję
          </button>
        </div>
        <div className="right-column">
          <Transactions 
            transactions={transactions} 
            setTransactions={setTransactions}
          />
        </div>
      </div>
      <AddTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTransactionAdded={fetchTransactions}
      />
    </div>
  );
}

export default App;
