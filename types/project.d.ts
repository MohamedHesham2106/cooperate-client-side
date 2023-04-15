interface IProject {
  _id: string;
  client_id: string;
  Freelancer_id: string;
  job: IJobs;
  project_status: string;
  milestone: IMilestone[];
  createdAt: string;
  updatedAt: string;
  rating?: IReviews[];
}
interface IReviews {
  _id: string;
  freelancer_Id: Partial<IUser>;
  client_Id: Partial<IUser>;
  job_id: string;
  value: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IMilestone {
  _id: string;
  title: string;
  status: 'Pending' | 'Complete';
  createdAt: string;
  updatedAt: string;
}
