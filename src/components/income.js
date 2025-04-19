import './income.css';

function Income({ income }) {
  const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];
  
  const currentMonth = months[new Date().getMonth()];

  return (
    <div className="main">
        <div className="text">
            <h3>Twój zysk na miesiąc {currentMonth}</h3>
            <p>{income} zł</p>
        </div>
    </div>
  );
}

export default Income;