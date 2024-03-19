import { useState } from "react";
import Image from "next/image";
import Category from "@/atomic-component/Category/Category";
import "./index.scss";
import logoVN from "../../../public/images/vn.png";
import logoJP from "../../../public/images/jp.png";
import { CategoryList, Locale, STATUS_CODE } from "@/util/constanst";

const FilterSearch = ({
  lang,
  dictionary,
  handleSubmit,
  keyword,
  country,
  category,
  allCategory
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  keyword: string | null;
  country: string | null;
  category: string | null;
  allCategory: CategoryList[]
}) => {
  const [value, setValue] = useState(country || "Japan");

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value);
  };

  return (
    <div className={`container_search`}>
      <div className="title-search">
        <span className="container_search_title">{dictionary["Search By Key Word"]}</span>
      </div>
      <form onSubmit={handleSubmit} method="get">
        <input type="hidden" name="pages" value={1} />
        <div className="search-box">
          <input
            type="text"
            name="keyword"
            defaultValue={keyword || ""}
            placeholder={dictionary["Search"]+"..."}
            id="search_input"
            className="input-search"
          />
        </div>
        <div className="search_country">
          <div className="title-search">
            <span className="container_search_title">{dictionary["Search By Country"]}</span>
          </div>
          <div className="search_flag_country">
            <div
              className="flag_country"
              style={
                value === "Viet Nam"
                  ? { border: "5px solid #2693f3", color: "#fff" }
                  : {}
              }
            >
              <input
                type="radio"
                value="Viet Nam"
                name="country"
                id="vietnam"
                style={{ width: 10 }}
                onClick={handleClick}
              />
              <label htmlFor="vietnam">
                <div className="flag_icon">
                  <Image src={logoVN} alt="" width={100} />
                </div>
              </label>
            </div>

            <div
              className="flag_country"
              style={
                value === "Japan"
                  ? { border: "5px solid #2693f3", color: "#fff" }
                  : {}
              }
            >
              <input
                onClick={handleClick}
                type="radio"
                value="Japan"
                name="country"
                defaultChecked={true}
                id="japan"
              />
              <label htmlFor="japan">
                <div className="flag_icon">
                  <Image src={logoJP} alt="" width={100} />
                </div>
              </label>
            </div>
          </div>
          <div className="btn-search-country">
            <button type="submit" className="btn-search">
            {dictionary["Search"]}
            </button>
          </div>
        </div>
        <Category
          data={allCategory}
          lang={lang}
          dictionary={dictionary}
          category={category}
        />
      </form>
    </div>
  );
};

export default FilterSearch;
