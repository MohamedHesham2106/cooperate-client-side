interface IProject {
  _id: string;
  client_id: string;
  Freelancer_id: string;
  job: IJobs;
  project_status: string;
  milestone: IMilestone[];
  createdAt: string;
  updatedAt: string;
}
interface IMilestone {
  _id: string;
  title: string;
  status: 'Pending' | 'Complete';
  createdAt: string;
  updatedAt: string;
}