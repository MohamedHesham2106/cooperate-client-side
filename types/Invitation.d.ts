interface IInvitation {
  invitation: {
    _id: string;
    freelancer_id: string;
    client_id: string;
    job_id: IJobs;
    invitation_letter: string;
    updatedAt: string;
    createdAt: string;
  };
}
