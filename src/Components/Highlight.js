import '../styles/Highlight.css';
import bestHoliday from '../assets/bestHoliday.jpeg';

const Highlight = () => {
  return (
    <div className="highlight-section">
      <img src={bestHoliday} alt="best-holiday" />
      <div className="highlight-content">
        <h2>The best holiday starts here!</h2>
        <p>Discover thousands of hotels with the best rates, reviews and real-time availability -  all in one place.</p>
        <button>Read More</button>
      </div>
    </div>
  );
};

export default Highlight;
