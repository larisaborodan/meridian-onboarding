import { useState } from 'react';
import './App.css';
import Checklist from './components/Checklist';
import People from './components/People';
import Guide from './components/Guide';

const TABS = ['My Onboarding', 'People', 'First Day Guide'];

function App() {
  const [activeTab, setActiveTab] = useState('My Onboarding');

  return (
    <div className="app">
      <header>
        <h1>Meridian Onboarding</h1>
        <p>Your first month, one step at a time.</p>
        <nav className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={tab === activeTab ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {activeTab === 'My Onboarding' && <Checklist />}
      {activeTab === 'People' && <People />}
      {activeTab === 'First Day Guide' && <Guide />}
    </div>
  );
}

export default App;