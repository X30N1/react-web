import './expenses.css';

const date = new Date()

function Expenses({ expenses }) {
  return (
    <div className="main-expenses">
        <div className="text-expenses">
            <h3>Twoje wydatki na miesiąc {date.getMonth()+1}</h3>
            <p>{expenses} zł</p>
        </div>
    </div>
  );
}

export default Expenses;