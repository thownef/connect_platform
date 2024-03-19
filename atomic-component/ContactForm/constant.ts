const date = new Date();
const f = Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
  timeStyle: "short",
});

const created_at = f.format(date);
const updated_at = f.format(date);

export const titleContact = [
  { title: "Email", name: "email_contact" },
  { title: "Name", name: "fullname" },
  { title: "Company", name: "company_contact" },
  { title: "Phone", name: "phone" },
]

export const titleContactUser = [
  { title: "Name", name: "fullname" },
  { title: "Position", name: "position" },
  { title: "Phone", name: "phone" },
]

export type DataContact = {
  language_id: string | number;
  id_contact: string;
  fullname: string;
  position: string;
  email: string | undefined;
  email_contact: string;
  company_name: string;
  company_contact: string;
  phone: string;
  description: string;
  created_at: string;
  updated_at: string;
  isContact: boolean;
};

export const initContact = {
  language_id: 1,
  id_contact: "",
  fullname: "",
  position: "",
  email: process.env.NEXT_PUBLIC_EMAIL_CONTACT,
  email_contact: "",
  company_name: "VIET JAPAN PARTNER",
  company_contact: "",
  phone: "",
  description: "",
  created_at: created_at,
  updated_at: updated_at,
  isContact: true,
};

export type DataContactUser = {
  language_id: string | number;
  id_contact: string | number;
  fullname: string;
  position: string;
  email: string;
  email_contact: string | undefined;
  company_name: string;
  company_contact: string;
  phone: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export const initContactUser = {
  language_id: 1,
  id_contact: "",
  fullname: "",
  position: "",
  email: "",
  email_contact:"",
  company_name: "",
  company_contact: "",
  phone: "",
  description: "",
  created_at: created_at,
  updated_at: updated_at,
};

export type DataContactExpert = {
  company_id: string | number;
  expert_id: string | number;
  expert_name: string;
  fullname: string;
  position: string;
  company_name: string;
  phone: string;
  email: string;
  email_contact: string;
  content: string;
  created_at: string;
};

export const initContactExpert = {
  company_id: "",
  expert_id: "",
  expert_name: "",
  position: "",
  fullname: "",
  company_name: "",
  phone: "",
  email: "",
  email_contact: "",
  content: "",
  created_at: created_at,
};

export type ContactType = 
| DataContact
| DataContactUser
| DataContactExpert