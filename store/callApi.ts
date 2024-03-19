import { DOMAIN } from '@/util/constanst'
import axios, { AxiosResponse } from 'axios'
import { RegisterUser } from './register/type'
import { CompanyInfo } from './info/type'
import { CompanyCoreMember, CompanyCustomer, CompanyDescription, CompanyFeature, CompanyProduct } from './profile/type'
import { ContactType } from '@/atomic-component/ContactForm/constant'

export const getJpCompany = async () => {
  try {
    const res = await axios.get(`${DOMAIN}getcompany/be/japancompany`)
    return res
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
}

export const getVnCompany = async () => {
  try {
    const res = await axios.get(`${DOMAIN}getcompany/be/vietnamcompany`)
    return res
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
}

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}auth/login`, {
      email: email,
      password: password,
    })
    return res
  } catch (error) {
    return error
  }
}

export const register = async (data: RegisterUser) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}auth/register`, data)
    return res
  } catch (e: any) {
    return e.response
  }
}

// Get company user
export const getUser = async (id: { id: string | number }) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}user/getuser/${id}`);
    return res;
  } catch (e) {
   
  }
};

//Get company
export const getCompany = async (id: { id: string | number } ) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}getcompany/${id}`);
    return res;
  } catch (error) {
    
  }
};

// Get company info
export const getCompanyInfo = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}getcompany/be/company/${id}`);
    return res;
  } catch (error) {
    
  }
};

// Update Company Info
export const updateCompanyInfo = async (data: CompanyInfo, id: string | number) => {
  try {
    const res: AxiosResponse = await axios.put(`${DOMAIN}getcompany/be/update/company/${id}`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// Get category
export const getCategory = async () => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}category/category`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// Get company introduce
export const getCompanyIntroduce = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}getcompany/be/introduce/${id}`);
    return res;
  } catch (err) {
    console.log(err)
  }
};

// update company introduce
export const updateCompanyIntroduce = async (data: CompanyDescription, id: string | number) => {
  try {
    const res: AxiosResponse = await axios.put(`${DOMAIN}getcompany/be/introduce/${id}`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//Create company product (package)
export const createCompanyProduct = async (data: CompanyProduct) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}getcompany/be/product/`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//get company product (package)
export const getCompanyProduct = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}getcompany/be/product/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//update company product (package)
export const updateCompanyProduct = async (data: CompanyProduct, id: string | number) => {
  try {
    const res: AxiosResponse = await axios.put(`${DOMAIN}getcompany/be/product/${id}`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//Delete company product (package)
export const deleteCompanyProduct = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.delete(`${DOMAIN}getcompany/be/product/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//get company feature
export const getCompanyFeature = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}getcompany/be/feature/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//create company feature
export const createCompanyFeature = async (data: CompanyFeature) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}getcompany/be/feature/`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//update company feature
export const updateCompanyFeature = async (data: CompanyFeature, id: string | number) => {
  try {
    const res: AxiosResponse = await axios.put(`${DOMAIN}getcompany/be/feature/${id}`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//delete company feature
export const deleteCompanyFeature = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.delete(`${DOMAIN}getcompany/be/feature/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//get company core member
export const getCompanyCoreMember = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}getcompany/be/member/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//create company feature
export const createCompanyCoreMember = async (data: CompanyCoreMember) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}getcompany/be/member/`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//update company core member
export const updateCompanyCoreMember = async (data: CompanyCoreMember, id: string | number) => {
  try {
    const res: AxiosResponse = await axios.put(`${DOMAIN}getcompany/be/member/${id}`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//delete company core member
export const deleteCompanyCoreMember = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.delete(`${DOMAIN}getcompany/be/member/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//get company customer
export const getCompanyCustomer = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}getcompany/be/customer/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//create company customer
export const createCompanyCustomer = async (data: CompanyCustomer) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}getcompany/be/customer/`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//update company customer
export const updateCompanyCustomer = async (data: CompanyCustomer, id: string | number) => {
  try {
    const res: AxiosResponse = await axios.put(`${DOMAIN}getcompany/be/customer/${id}`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//delete company core member
export const deleteCompanyCustomer = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.delete(`${DOMAIN}getcompany/be/customer/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// search company
export const searchCompanyByKeyWord = async (keyword: string | null, category: string | null , country: string | null, currentPage: string | number | null) => {
  
  try {
    let url = `${DOMAIN}getcompany/be/getCompanyByKeyword?country=${country}&pages=${currentPage}`;

    if (category) {
      url += `&category=${category}`;
    }

    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    const res: AxiosResponse = await axios.get(url);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// send contact vjp or company
export const sendContact = async (data: ContactType) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}contact/be/contact`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// send mail to vjp or company
export const sendMailContact = async (data: ContactType) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}send`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// send contact expert
export const sendContactExpert = async (data: ContactType) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}contact/be/expert`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// send mail to expert
export const sendMailContactExpert = async (data: ContactType) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}sendExpert`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// send mail register
export const sendMailRegister = async (data: any) => {
  let newData = {...data, fullname: data.user_name}
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}send-user`, newData);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// get all expert in client
export const getExpertClient = async (keyword: string) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}getcompany/be/u/expert?search=${keyword}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//get expert by id
export const getExpertByID = async (id: string | number) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}getcompany/be/expert/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//get mail inbox by email
export const getMailInbox = async (email: string) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}contact/be/inbox/${email}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//get mail sent by email
export const getMailSent = async (email: string) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}contact/be/sent/${email}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//get mail sent expert by email
export const getMailSentExpert = async (email: string) => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}contact/be/expert/${email}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

//update seen mail inbox
export const updateSeenMail = async (id: string| number) => {
  try {
    const res: AxiosResponse = await axios.put(`${DOMAIN}contact/be/inbox/${id}`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// create new profile info company
export const createNewProfile = async (data: any) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}profile/be/updateprofile`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// create new profile info company
export const createViewLog = async (data: any) => {
  try {
    const res: AxiosResponse = await axios.post(`${DOMAIN}user/be/viewlog`, data);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// Get category
export const getArea = async () => {
  try {
    const res: AxiosResponse = await axios.get(`${DOMAIN}area/`);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};

// Get company vic
export const getCompanyVic = async (keyword: string | null, category: string | null , country: string | null, pages: string | number | null) => {
  try {
    let url = `${DOMAIN}getcompany/be/companyvic?pages=${pages}`;
    
    if (keyword) {
      url += `&keyword=${keyword}`;
    }

    if (category) {
      url += `&area=${category}`;
    }

    if (country) {
      url += `&country=${country}`;
    }
    const res : AxiosResponse = await axios.get(url);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || null,
      };
    }
  }
};