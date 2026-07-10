"use client";

import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";

type Job = {
  id: number;
  title: string;
  status: string;
  client: string;
};

const powerJob = {
  id: 1,
  title: "Wiring",
  status: "In progress",
  client: "Jane Smith",
};
const waterJob = {
  id: 2,
  title: "Plumbing work",
  status: "Pending",
  client: "John Smith",
};
const buildingJob = {
  id: 3,
  title: "Plastering",
  status: "Delayed",
  client: "Bob Jane",
};
const hardCodedJobsArray = [powerJob, waterJob, buildingJob];

export default function JobList() {
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      setJobs(hardCodedJobsArray);
      setLoading(false);
    }
    loadJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  const jobCards = [];
  for (const job of jobs) {
    jobCards.push(
      <JobCard
        key={job.id}
        title={job.title}
        status={job.status}
        client={job.client}
      />
    );
  }
  return <div>{jobCards}</div>;
}

/*
export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]); // start with empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function runs once when the component first mounts
    async function loadJobs() {
      setJobs(hardCodedJobsArray);
      setLoading(false);
    }
    loadJobs();
  }, []); // Empty array = run once only. This is important.

  if (loading === true) return <p>Loading jobs...</p>;

  return (
    <div>
      {jobs.map((job) => (
        // The key prop is required. It helps React track items efficiently.
        // Always use a unique ID, not the array index.
        <JobCard
          key={job.id}
          title={job.title}
          status={job.status}
          client={job.client}
        />
      ))}
    </div>
  );
}
*/