import { useState } from 'react';
import { apiService } from '../services/api';
import './Register.css';

function Register({ onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiService.register(formData);
            onSwitchToLogin(); // Switch to login view after successful registration
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label>Imię:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Hasło:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                </div>
                <button type="submit">Zarejestruj się</button>
                <p className="switch-auth">
                    Masz już konto?
                    <button type="button" onClick={onSwitchToLogin}>
                        Zaloguj się
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Register;