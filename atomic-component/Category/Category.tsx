import { CategoryType, Locale } from "@/util/constanst";
import { useState } from "react";

const Category = ({
  lang,
  dictionary,
  data,
  category,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  data: CategoryType;
  category: string | null;
}) => {
  const [activeId, setActiveId] = useState<string | number>(category || "");
  return (
    <div className="search_category">
      <div className="title-search">
        <span className="container_search_title">{dictionary["Categoty"]}</span>
      </div>
      <div className="search_category_content">
        <input type="hidden" name="category" value={activeId} />
        <ul className="category_content">
          <li
            onClick={() => {
              setActiveId("");
            }}
            className={activeId === "" ? "active_category" : ""}
          >
            {dictionary["ALL"]}
          </li>
          {data?.map((item) => (
            <li
              key={item.id}
              className={
                activeId && Number(activeId) === Number(item.id) ? "active_category" : ""
              }
              onClick={() => {
                setActiveId(item.id);
              }}
            >
              <span>
                {lang === "vi" ? (
                  <>{item.name}</>
                ) : lang === "ja" ? (
                  <>{item.name_jp || item.name_ja}</>
                ) : (
                  <>{item.name_en}</>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="btn-search-category">
        <button type="submit" className="btn-search">
          {dictionary["Search"]}
        </button>
      </div>
    </div>
  );
};

export default Category;
