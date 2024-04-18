export type Mail = {
  id: string | number;
  language_id: string | number;
  id_contact: string | number;
  fullname: string;
  position: string;
  email: string;
  email_contact: string;
  company_name: string;
  company_contact: string;
  phone: string;
  description: string;
  created_at: string;
  updated_at: string;
  allow: string;
  status: boolean;
};

export type MailExpert = {
  id: string | number;
  company_id: string | number;
  expert_name: string;
  fullname: string;
  company_name: string;
  phone: string;
  email: string;
  email_contact: string;
  content: string;
  created_at: string;
  expert_id: string;
};

export const titleMail = [
  { id: 1, title: "Inbox" },
  { id: 2, title: "Sent" },
  { id: 3, title: "Contact Expert" },
];

export type MailType = Mail & MailExpert;
