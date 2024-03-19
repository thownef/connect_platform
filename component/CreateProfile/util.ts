export const deleteItem = (formikBag: any, title: string, id: number, index: number) => {
    let data = formikBag.values[title];
    let touched = formikBag.touched[title]
    let key1 = data.findIndex((item: any) => item.id === id);
    if (key1 !== -1) {
      data.splice(key1, 1);
    }
    if (touched && touched.length > index) {
      touched.splice(index, 1);
    }
    formikBag.setFieldValue(title, data);
    formikBag.setFieldTouched(title, touched);
  };