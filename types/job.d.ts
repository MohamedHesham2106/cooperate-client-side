interface IJob {
  title?: string;
  description?: string;
  budget?: number;
  payment_type?: 'Fawry' | 'paypal';
  project_length?: DateValueType;
  experience_level?: 'entry' | 'intermediate' | 'expert';
  category?: string;
  skills?: string[] | [];
}
