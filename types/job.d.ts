interface IJob {
  title?: string;
  description?: string;
  budget?: number;
  payment_type?: 'Fawry' | 'paypal';
  project_length?: DateValueType;
  experience_level?: 'entry' | 'intermediate' | 'expert';
  category?: string;
  skills?: string[] | [];
  card_number?: string;
  cvc?: string;
  name_on_card?: string;
}
interface IJobs {
  _id: string;
  title: string;
  description: string;
  payment_type: string;
  project_length: string;
  skills: {
    _id: string;
    name: string;
  }[];
  category: {
    _id: string;
    name: string;
  };
  experience_level: string;
  budget: number;
  title: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
