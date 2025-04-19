import './expenses.css';

function Expenses({ expenses }) {
  const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];
  
  const currentMonth = months[new Date().getMonth()];

  return (
    <div className="main-expenses">
        <div className="text-expenses">
            <h3>Twoje wydatki na miesiąc {currentMonth}</h3>
            <p>{expenses} zł</p>
        </div>
    </div>
  );
}

export default Expenses;