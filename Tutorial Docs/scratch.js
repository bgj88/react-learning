// node "Tutorial Docs\scratch.js"

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
  client: 'Jane Smith'
};
const buildingJob = {
  id: 3,
  title: 'Plastering',
  status: 'Delayed',
  client: 'Jane Smith'
};
let projectJobs = [powerJob,waterJob,buildingJob];

//-----------------------------------------------------------------------

async function simulateFetch(){
  try{
    const response = await new Promise(resolve => setTimeout(resolve, 100));
    return projectJobs;
  } catch {
    console.error('Failed to fetch jobs:',error);
  }
}

let fetchJobbies = simulateFetch();

simulateFetch().then((fetchJobbies) => {
  console.log(fetchJobbies);
});


//-----------------------------------------------------------------------


/*


function getPendingJobTitles(jobs) {
    const pendingTitles = [];
      for (const job of jobs) {
        if (job.status.includes('Pending')) {
          pendingTitles.push(job.title);
        }
      }
    return pendingTitles;
  }


let pendingJob = getPendingJobTitles(projectJobs);



console.log(pendingJob);




//let projectJobTitles = projectJobs.map((work) => work.title);
//let pendingJob = projectJobs.filter((job) => job.status.includes('Pending')).map((job) => job.title);
//console.log(projectJobs);














*/