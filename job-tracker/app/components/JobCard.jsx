// app/components/JobCard.jsx

// A simple React component.
// Convention: component names start with a capital letter.

import { useState } from 'react';


function JobCard({ title, client, initialStatus }) {

  const [status, setStatus] = useState(initialStatus);

  const toggleStatus = () => {
    if (status === 'pending') {
      setStatus('complete');
    } else {
      setStatus('pending');
    }
  };

  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p>Client: {client}</p>
      <p>Status: {status}</p>
      <button onClick={toggleStatus}>Toggle Status</button>
    </div>
  );

}

export default JobCard;