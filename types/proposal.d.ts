interface IProposal {
  proposal: {
    _id: string;
    freelancer_id: string;
    client_id: string;
    job_id: IJobs;
    cover_letter: string;
    website_link: string;
    updatedAt: string;
    createdAt: string;
    proposal_status?: 'pending' | 'accepted' | 'declined';
  };
}
