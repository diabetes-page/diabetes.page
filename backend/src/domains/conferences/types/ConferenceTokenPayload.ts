export type ConferenceTokenPayload = {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  room: string;

  context: {
    user: {
      name: string;
      email: string;
      isConsultant: boolean;
    };
    appointment: {
      id: string;
    };
  };
};
