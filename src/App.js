import { useState, useEffect } from 'react';
import './App.css';
import Income from './components/income';
import Expenses from './components/expenses';
import Transactions from './components/Transactions';
import AddTransactionModal from './components/AddTransactionModal';

function App() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTransactionAdded = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/fetch');
      const data = await response.json();
      setTransactions(data.items || []);
    } catch (error) {
      console.error('Error refreshing transactions:', error);
    }
  };

  useEffect(() => {
    handleTransactionAdded();
  }, []);

  useEffect(() => {
    if (!Array.isArray(transactions)) return;

    const currentMonth = new Date().getMonth() + 1;
    const monthlyTransactions = transactions.filter(t => {
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
  }, [transactions]);

  return (
    <div className="App">
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
        onTransactionAdded={handleTransactionAdded}
      />
    </div>
  );
}

export default App;
