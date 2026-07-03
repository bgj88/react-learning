// app/components/JobCard.jsx

// A simple React component.
// Convention: component names start with a capital letter.
function JobCard({ title, status, client }) {
  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p>Client: {client}</p>
      <span>{status}</span>
    </div>
  );
}
export default JobCard;