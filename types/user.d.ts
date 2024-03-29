type IUser = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
  isEmailVerified: boolean;
  address?: string;
  phone?: string;
  gender?: 'M' | 'F';
  birthDate?: Date;
  imageUrl?: string;
  country: string;
  role: 'admin' | 'freelancer' | 'client';
  CvUrl?: string;
  language?: { _id: string; language: string; level: string }[];
  education?: string;
  biography?: string;
  company_name?: string;
  skills?: { _id: string; name: string }[];
  categories?: { _id: string; name: string }[];
  personal_projects?: { _id: string; title: string; url: string }[];
  jobs?: IJobs[];
  createdAt: string;
  updatedAt: string;
  isIDVerified: boolean;
  IDimage?: Buffer;
};
