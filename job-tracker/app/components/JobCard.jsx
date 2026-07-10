// app/components/JobCard.jsx

"use client";
import { useState, useEffect } from 'react';

const powerJob = {
  id: 1,
  title: 'Wiring',
  status: 'In progress',
  client: 'Jane Smith'
};
const waterJob = {
  id: 2,
  title: 'Plumbing work',
  status: 'Pending',
  client: 'John Smith'
};
const buildingJob = {
  id: 3,
  title: 'Plastering',
  status: 'Delayed',
  client: 'Bob Jane'
};
const hardCodedJobsArray = [powerJob,waterJob,buildingJob];

function JobList() {
  
  const [jobs, setJobs] = useState([]);        // start with empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function runs once when the component first mounts
    async function loadJobs() {
      setJobs(hardCodedJobsArray);
      setLoading(false);
    }
    loadJobs();
  }, []); // Empty array = run once only. This is important.

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} title={job.title} status={job.status} />
      ))}
    </div>
  );
}

export default JobCard;