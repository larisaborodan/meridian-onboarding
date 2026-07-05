import { useState, useEffect } from 'react';

const API = 'http://localhost:3001/api';


const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'];

function People() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${API}/employees`)
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  return (
    <div>
      <p className="page-intro">
        Who to reach out to in your first weeks. People marked as{' '}
        <span className="badge">Buddy</span> are happy to answer any question.
      </p>

      {DEPARTMENTS.map((dept) => (
        <section key={dept}>
          <h2>{dept}</h2>
          {employees
            .filter((e) => e.department === dept)
            .map((emp) => (
              <div key={emp.id} className="person">
                <div className="avatar">{emp.name.charAt(0)}</div>
                <div className="person-info">
                  <strong>
                    {emp.name} {emp.is_buddy ? <span className="badge">Buddy</span> : null}
                  </strong>
                  <p>{emp.role}</p>
                </div>
                <div className="person-contact">
                  <p>{emp.slack_handle}</p>
                  <p>{emp.email}</p>
                </div>
              </div>
            ))}
        </section>
      ))}
    </div>
  );
}

export default People;