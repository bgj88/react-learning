
import JobCard from "./components/JobCard";

const jobs = [
  { id: 1, title: 'Fix hot water',   status: 'pending',  client: 'Jane Smith' },
  { id: 2, title: 'Repair roof',     status: 'complete', client: 'Bob Jones' },
  { id: 3, title: 'Install lights',  status: 'pending',  client: 'Alice Brown' },
];

export default function JobList(){
  return (
      <div>
        {jobs.map((job) => (
          // The key prop is required. It helps React track items efficiently.
          // Always use a unique ID, not the array index.
          <JobCard
            key={job.id}
            title={job.title}
            initialStatus={job.status}
            client={job.client}
          />
        ))}
      </div>
    );
}

 
