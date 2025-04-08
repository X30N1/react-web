import './income.css';

const date = new Date()

function Income({ income }) {
  return (
    <div className="main">
        <div className="text">
            <h3>Twój zysk na miesiąc {date.getMonth()+1}</h3>
            <p>{income} zł</p>
        </div>
    </div>
  );
}

export default Income;