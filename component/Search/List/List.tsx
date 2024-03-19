import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Col, Pagination, PaginationProps, Row } from "antd";
import Company from "@/atomic-component/Company/Company";
import { JPCompany } from "@/store/dashboard/type";
import { Locale } from "@/util/constanst";
import ImageDefault from "../../../public/images/data-not-found.png";
import { scrollToTopSearch } from "@/helper";

const List = ({
  lang,
  dictionary,
  data,
  current,
  totalResult,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  data: JPCompany[];
  current: string | number;
  totalResult: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handlePagination: PaginationProps["onChange"] = (value) => {
    scrollToTopSearch();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("pages", value.toString());
    router.push(pathname + "?" + newSearchParams.toString());
  };
  return (
    <Row justify={"center"}>
      {data && data.length > 0 ? (
        data &&
        data.map((item) => (
          <Col lg={12} md={24} key={item.id}>
            <Company lang={lang} dictionary={dictionary} data={item} />
          </Col>
        ))
      ) : (
        <Col span={24} className="search__notfound">
          <Row justify={"center"}>
            <Image src={ImageDefault} alt="" style={{ width: "300px" }} />
          </Row>
          <h4>Data not found</h4>
        </Col>
      )}
      {data && data.length > 0 && (
        <Col span={24}>
          <Pagination
            current={Number(current)}
            showSizeChanger={false}
            total={totalResult}
            defaultPageSize={10}
            responsive={true}
            onChange={handlePagination}
            style={{
              textAlign: "center",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
        </Col>
      )}
    </Row>
  );
};

export default List;
