
import JobCard from "./components/JobCard";

export default function JobList(){
  return (
    <div>
      <JobCard title="Fix hot water" client="Jane" status="pending" />
      <JobCard title="Repair roof" client="John" status="complete" />
      <JobCard title="Rewire garage" client="Bob" status="in progress" />
    </div>
  );
}


