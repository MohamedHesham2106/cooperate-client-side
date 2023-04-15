interface IAdminMessage {
  _id: string;
  subject: string;
  sender_id: Partial<IUser>;
  message: string;
  createdAt: string;
  updatedAt: string;
  status: 'read' | 'unread';
}
