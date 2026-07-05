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

  // Toggle a task in the database, then update it in local state
  function toggleTask(id) {
    fetch(`${API}/tasks/${id}/toggle`, { method: 'PATCH' })
      .then((res) => res.json())
      .then((updated) =>
        setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)))
      );
  }

  const phases = [
    { key: 'day1', label: 'Day 1' },
    { key: 'week1', label: 'Week 1' },
    { key: 'month1', label: 'Month 1' },
  ];

  const done = tasks.filter((t) => t.completed).length;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <div className="app">
      <header>
        <h1>Meridian Onboarding</h1>
        <p>Your first month, one step at a time.</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-label">
          {done} of {tasks.length} tasks done ({progress}%)
        </p>
      </header>

      {phases.map((phase) => (
        <section key={phase.key}>
          <h2>{phase.label}</h2>
          {tasks
            .filter((t) => t.due_phase === phase.key)
            .map((task) => (
              <label key={task.id} className={`task ${task.completed ? 'done' : ''}`}>
                <input
                  type="checkbox"
                  checked={!!task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                </div>
              </label>
            ))}
        </section>
      ))}
    </div>
  );
}

export default App;