const InputError = ({ formikBag, item, index }: { formikBag: any; item: string; index: number }) => {
  const fieldProps = formikBag.getFieldProps(`products[${index}].${item}`);

  return (
    <>
      <input {...fieldProps} className="company_name" />
      {formikBag.errors.products &&
        formikBag.errors.products[index] &&
        formikBag.errors.products[index][item] &&
        formikBag.touched.products &&
        formikBag.touched.products[index] &&
        formikBag.touched.products[index][item] && (
          <span className="error_input">{formikBag.errors.products[index][item]}</span>
        )}
    </>
  );
};

export default InputError;
