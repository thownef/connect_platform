"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Col, Row } from "antd";
import { CategoryList, Locale, STATUS_CODE } from "@/util/constanst";
import FilterSearch from "./FilterSearch/FilterSearch";
import List from "./List/List";
import { getCategory, searchCompanyByKeyWord } from "@/store/callApi";
import { JPCompany } from "@/store/dashboard/type";
import "./index.scss";
import { endLoading, startLoading } from "@/store/loading/action";

const SearchPage = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [allCategory, setAllCategory] = useState<CategoryList[]>([]);
  const [listCompany, setListCompany] = useState<JPCompany[]>([]);
  const [current, setCurrent] = useState<string | number>(1);
  const [totalResult, settotalResult] = useState<number>(0);
  const [title, setTitle] = useState<CategoryList | null>();
  const pages = searchParams.get("pages");
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const country = searchParams.get("country");

  const getFieldValue = (form: HTMLFormElement, fieldName: string): string => {
    const field = (form.elements as any)[fieldName];
    return field ? field.value : "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldsToGet = ["keyword", "country", "category"];
    const newSearchParams = new URLSearchParams(searchParams);
    fieldsToGet.forEach((fieldName) => {
      newSearchParams.set(fieldName, getFieldValue(e.currentTarget, fieldName));
    });

    newSearchParams.set("pages", "1");
    router.push(pathname + "?" + newSearchParams.toString());
  };

  const fetchCompany = async (
    keyword: string | null,
    category: string | null,
    country: string | null,
    pages: string | null
  ) => {
    try {
      const res = await searchCompanyByKeyWord(
        keyword,
        category,
        country,
        pages
      );

      if (res && res.status === STATUS_CODE.SUCCESS) {
        setListCompany(res?.data.data);
        setCurrent(res?.data.currentPage);
        settotalResult(res?.data.totalResults);
      }
    } catch (err) {}
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        dispatch(startLoading());
        const res = await getCategory();
        if (res && res.status === STATUS_CODE.SUCCESS) {
          setAllCategory(res.data.data);
        }
      } finally {
        dispatch(endLoading());
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    if (!searchParams.size) {
      fetchCompany("", "", "Japan", "1");
    } else {
      fetchCompany(keyword, category, country, pages);
    }
  }, [keyword, category, country, pages]);

  useEffect(() => {
    if (category) {
      if(allCategory){
        const index = allCategory?.findIndex(
          (item) => Number(item.id) === Number(category)
        );
        setTitle(allCategory && allCategory[index]);
      }
    } else {
      setTitle(null);
    }
  }, [category, allCategory]);

  return (
    <Row>
      <Col xl={6} lg={24}>
        <div className="row-space">
          <FilterSearch
            lang={lang}
            dictionary={dictionary}
            handleSubmit={handleSubmit}
            keyword={keyword}
            country={country}
            category={category}
            allCategory={allCategory}
          />
        </div>
      </Col>
      <Col xl={18} lg={24}>
        <div className="row-space">
          <Row className="search__title">
            <h2>
              {dictionary["Result For"]}:{" "}
              {!title ? (
                dictionary["ALL"]
              ) : lang === "vi" ? (
                <>{title?.name}</>
              ) : (
                <>{title?.name_en}</>
              )}
            </h2>
          </Row>

          <List
            lang={lang}
            dictionary={dictionary}
            data={listCompany}
            current={current}
            totalResult={totalResult}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SearchPage;
