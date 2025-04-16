import { useState } from 'react';
import './App.css';
import Income from './components/income';
import Expenses from './components/expenses';
import Transactions from './components/Transactions';

function App() {
  const [income, setIncome] = useState(4500);
  const [expenses, setExpenses] = useState(2500);
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="App">
      <div className="dashboard-layout">
        <div className="left-column">
          <Income income={income} />
          <Expenses expenses={expenses} />
        </div>
        <div className="right-column">
          <Transactions 
            transactions={transactions} 
            setTransactions={setTransactions}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
