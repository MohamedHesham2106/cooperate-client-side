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
  projectUrl?: string;
}
interface IReviews {
  _id: string;
  user: Partial<IUser>;
  rated_user: Partial<IUser>;
  job_id: string;
  value: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status?: 'Positive Review' | 'Negative Review';
}

interface IMilestone {
  _id: string;
  title: string;
  status: 'Pending' | 'Complete';
  createdAt: string;
  updatedAt: string;
}
