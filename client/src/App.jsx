import { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:3001/api';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  return (
    <div>
      <h1>Meridian Onboarding</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} — {task.due_phase}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;