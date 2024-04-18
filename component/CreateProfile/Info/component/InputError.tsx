const InputError = ({ formikBag, item }: { formikBag: any; item: string }) => {
  const fieldProps = formikBag.getFieldProps(`info[0].${item}`);

  return (
    <>
      <input {...fieldProps} className="company_name" />
      {formikBag.errors.info &&
        formikBag.errors.info[0] &&
        formikBag.errors.info[0][item] &&
        formikBag.touched.info &&
        formikBag.touched.info[0] &&
        formikBag.touched.info[0][item] && (
          <span className="error_input">{formikBag.errors.info[0][item]}</span>
        )}
    </>
  );
};

export default InputError;
