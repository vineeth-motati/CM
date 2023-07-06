export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

export interface ContactState {
  contact: Contact;
}
