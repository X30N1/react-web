import { useState, useEffect } from 'react';
import './Transactions.css';
import Pagination from './Pagination';

function Transactions({ transactions, setTransactions }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [items, setItems] = useState([]);
    const [perPage, setPerPage] = useState(5);

    const fetchTransactions = async (page, itemsPerPage = perPage) => {
        try {
            const response = await fetch(`http://localhost:8000/api/fetch?page=${page}&per_page=${itemsPerPage}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setItems(data.items || []);
            setCurrentPage(data.page);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchTransactions(1);
    }, []);

    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            await fetchTransactions(newPage);
        }
    };

    const handlePerPageChange = async (e) => {
        const newPerPage = parseInt(e.target.value);
        setPerPage(newPerPage);
        await fetchTransactions(1, newPerPage);
    };

    return (
        <div className="transactions-container">
            <div className="transactions-header">
                <h2>Historia Transakcji</h2>
                <div className="per-page-selector">
                    <label>Ilość na stronie:</label>
                    <select value={perPage} onChange={handlePerPageChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                </div>
            </div>
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Ilość</th>
                        <th>Typ</th>
                        <th>Kategoria</th>
                        <th>Data</th>
                        <th>Czas</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(items) && items.length > 0 ? (
                        items.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.name}</td>
                                <td>{transaction.amount} zł</td>
                                <td>{transaction.type === 'income' ? 'Przychód' : 'Wydatek'}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.time}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                Brak transakcji
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default Transactions;