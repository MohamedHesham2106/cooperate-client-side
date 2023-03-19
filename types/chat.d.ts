interface IChat {
  _id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  createdAt: string;
}
interface IConversation {
  _id: string;
  client_id: string;
  Freelancer_id: string;
  chat: IChat[];
}
