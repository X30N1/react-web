# System Zarządzania Transakcjami

## Opis Projektu
Aplikacja webowa do zarządzania osobistymi transakcjami finansowymi. Umożliwia użytkownikom śledzenie przychodów i wydatków, kategoryzowanie transakcji oraz przeglądanie historii operacji finansowych.

## Technologie
- **Frontend:**
  - React.js
  - CSS
- **Backend:**
  - Python (FastAPI)
  - MongoDB
- **Autentykacja:**
  - JWT (JSON Web Tokens)

## Funkcjonalności
- System autoryzacji (logowanie/rejestracja)
- Zarządzanie transakcjami (dodawanie, przeglądanie)
- Kategoryzacja transakcji
- Miesięczne podsumowania finansowe
- Paginacja listy transakcji
- Filtrowanie transakcji według miesiąca

## Instalacja

### Wymagania
- Node.js (v14+)
- Python (v3.8+)
- MongoDB

### Frontend
```bash
# Instalacja zależności
npm install

# Uruchomienie aplikacji
npm start
```

### Backend
```bash
# Utworzenie wirtualnego środowiska
python -m venv venv
source venv/bin/activate

# Instalacja zależności
pip install -r requirements.txt

# Uruchomienie serwera
cd backend
uvicorn server:app --reload
```

## Struktura Projektu
```
react-web/
├── src/
│   ├── components/
│   │   ├── AddTransactionModal.js
│   │   ├── Expenses.js
│   │   ├── Income.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Transactions.js
│   ├── App.js
│   └── App.css
└── backend/
    ├── server.py
    └── models.py
```

## Endpointy API

### Autoryzacja
- `POST /api/register` - Rejestracja nowego użytkownika
- `POST /api/token` - Logowanie i otrzymanie tokenu JWT

### Transakcje
- `GET /api/fetch` - Pobieranie listy transakcji
- `POST /api/insert` - Dodawanie nowej transakcji