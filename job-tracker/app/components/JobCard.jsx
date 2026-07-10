// app/components/JobCard.jsx

function JobCard({ title, status, client }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Client: {client}</p>
      <span>{status}</span>
    </div>
  );
}

export default JobCard;
