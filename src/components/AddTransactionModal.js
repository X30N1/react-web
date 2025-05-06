import { useState } from 'react';
import './AddTransactionModal.css';
import { apiService } from '../services/api';

function AddTransactionModal({ isOpen, onClose, onTransactionAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiService.addTransaction(formData);
            // Reset form data
            setFormData({
                name: '',
                amount: '',
                type: 'expense',
                category: '',
                date: new Date().toISOString().split('T')[0],
                time: new Date().toTimeString().split(' ')[0]
            });
            // Trigger the callback to refresh transactions
            if (onTransactionAdded) {
                await onTransactionAdded();
            }
            onClose();
        } catch (error) {
            console.error('Error adding transaction:', error);
            alert('Error adding transaction. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Dodaj nową transakcję</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nazwa:</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Ilość:</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Typ:</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            required
                        >
                            <option value="expense">Wydatek</option>
                            <option value="income">Przychód</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Kategoria:</label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Data:</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Czas:</label>
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit">Dodaj transakcję</button>
                        <button type="button" onClick={onClose}>Anuluj</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTransactionModal;