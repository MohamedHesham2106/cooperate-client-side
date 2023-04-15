interface INotification {
  _id: string;
  user: Partial<IUser>;
  target: Partial<IUser>;
  feedback: string;
  read: boolean;
  destination: string;
  createdAt: string;
}
