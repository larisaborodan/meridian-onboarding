import { useState, useEffect } from 'react';

const API = 'http://localhost:3001/api';

function Guide() {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    fetch(`${API}/faq`)
      .then((res) => res.json())
      .then(setFaq);
  }, []);

 
  const categories = [...new Set(faq.map((f) => f.category))];

  return (
    <div>
      <div className="info-card">
        <h2>Your first day, in short</h2>
        <p>
          Come to the office (Mon, Tue and Thu are office days). Pick up your
          laptop and badge from Laura (HR, room 204), then follow your Day 1
          checklist. Your buddy will find you on Slack — say hi!
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat}>
          <h2>{cat}</h2>
          {faq
            .filter((f) => f.category === cat)
            .map((item) => (
              <details key={item.id} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
        </section>
      ))}
    </div>
  );
}

export default Guide;