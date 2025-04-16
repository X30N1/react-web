import { useEffect } from 'react';
import './Transactions.css';
import { apiService } from '../services/api';

function Transactions({ transactions, setTransactions }) {
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await apiService.fetchTransactions();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [setTransactions]);

    return (
        <div className="transactions-container">
            <h2>Transactions History</h2>
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.name}</td>
                            <td>{transaction.amount} zł</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;