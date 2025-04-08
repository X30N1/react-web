import { useState } from 'react';
import './App.css';
import Income from './income';
import Expenses from './expenses';

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
          {/* Transactions component will go here */}
        </div>
      </div>
    </div>
  );
}

export default App;
