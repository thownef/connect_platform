import * as Yup from "yup";

export const updateInfoSchema = (dictionary: { [key: string]: string }) => {
  return Yup.object().shape({
    info: Yup.array().of(
      Yup.object().shape({
        estalishment: Yup.number()
          .typeError("Năm thành lập phải là một số")
          .required("Please enter your estalishment"),
        employers: Yup.number()
          .typeError("Số nhân viên phải là một số")
          .required("Please enter your employers"),
        ceategory: Yup.string().required("Please enter your ceategory"),
        capital: Yup.string().required("Please enter your capital"),
      })
    ),
    products: Yup.array().of(
      Yup.object().shape({
        product_name: Yup.string().required("Please enter your product_name"),
        product_name_EN: Yup.string().required(
          "Please enter your product_name_EN"
        ),
        product_name_JP: Yup.string().required(
          "Please enter your product_name_JP"
        ),
      })
    ),
    members: Yup.array().of(
      Yup.object().shape({
        member_name: Yup.string().required("Please enter your member_name"),
      })
    ),
    clients: Yup.array().of(
      Yup.object().shape({
        client_name: Yup.string().required("Please enter your client_name"),
      })
    ),
  });
};
