interface IInvitation {
  invitation: {
    _id: string;
    freelancer_id: string;
    client_id: Partial<IUser>;
    job_id: IJobs;
    invitation_letter: string;
    updatedAt: string;
    createdAt: string;
  };
}
