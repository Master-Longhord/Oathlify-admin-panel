export interface Affidavit {
  id: string;
  createdAt: string;
  status: string;
  user: {
    profile: {
      firstName: string;
      lastName: string;
    };
  };
  template: {
    name: string;
  };
}

export interface AffidavitDetail extends Affidavit {
  signatureKey: string | null;
  videoRecordingKey: string | null;
  finalDocumentKey: string | null;
  user: {
    email: string;
    phone: string | null;
    profile: {
      firstName: string;
      lastName: string;
    };
  };
}
