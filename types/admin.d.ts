interface IAdminMessage {
  _id: string;
  subject: string;
  sender_id: Partial<IUser>;
  message: string;
  createdAt: string;
  updatedAt: string;
  status: 'read' | 'unread';
}
interface IReports {
  _id: string;
  userId: Partial<IUser>;
  reported_user: Partial<IUser>;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}
