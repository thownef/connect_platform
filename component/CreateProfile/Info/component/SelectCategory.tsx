import { useSelector } from "react-redux";
import { Category } from "@/store/category/type";
import { RootState } from "@/store/reducer";
import { Locale } from "@/util/constanst";

const SelectCategory = ({
  formikBag,
  lang,
}: {
  formikBag: any;
  lang: Locale;
}) => {
  const allCategory: Category[] = useSelector(
    (state: RootState) => state.category
  );
  return (
    <select
      defaultValue="999"
      onChange={(e) => {
        const newValue = e.target.value;
        formikBag.setFieldValue("info[0].ceategory", newValue);
      }}
      name="ceategory"
      className="ceategory_member company_name"
    >
      {allCategory &&
        allCategory.length > 0 &&
        allCategory.map((item: any) => (
          <option value={item.id} key={item.id}>
            {lang === "vi" ? (
              <>{item.name}</>
            ) : lang === "ja" ? (
              <>{item.name_jp}</>
            ) : (
              <>{item.name_en}</>
            )}
          </option>
        ))}
    </select>
  );
};

export default SelectCategory;
