import { Fragment } from "react";
import { useSelector } from "react-redux";
import Wrapper from "@/atomic-component/Wrapper";
import { checkNull } from "@/helper";
import { CompanyReview } from "@/store/profile/type";
import { RootState } from "@/store/reducer";
import { Locale } from "@/util/constanst";
import { Col, Row } from "antd";
import "./index.scss";

const Review = ({
  lang,
  dictionary,
  isUser
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  isUser: boolean
}) => {
  const companyReview: CompanyReview[] = useSelector(
    (state: RootState) => state.profile.review
  );
  return (
    <Wrapper>
      <Row justify={"center"}>
        <Col span={24}>
          <h1 className="review__title">{"REVIEW"}</h1>
        </Col>
      </Row>

      {lang &&
        (companyReview.length > 0 ? (
          <Row gutter={[24, 24]} align={"middle"}>
            {companyReview.map((item, index) => (
              <Fragment key={index}>
                {index % 2 === 0 ? (
                  <>
                    <Col span={6} className="review__img">
                      <img className="" src={item.review_img} alt="" />
                    </Col>
                    <Col className="review__wrapper" span={18}>
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      />
                      <p
                        className="review__left"
                        dangerouslySetInnerHTML={{
                          __html: checkNull(
                            lang === "vi"
                              ? item.content_vn
                              : lang === "en"
                              ? item.content_en
                              : item.content_jp
                          ),
                        }}
                      />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col className="review__wrapper" span={18}>
                      <p
                        className="review__left"
                        dangerouslySetInnerHTML={{
                          __html: checkNull(
                            lang === "vi"
                              ? item.content_vn
                              : lang === "en"
                              ? item.content_en
                              : item.content_jp
                          ),
                        }}
                      />
                    </Col>
                    <Col span={6} className="review__img">
                      <img className="" src={item.review_img} alt="" />
                    </Col>
                  </>
                )}
              </Fragment>
            ))}
          </Row>
        ) : (
          <div className="review__wrapper">
            <p>{"There are no reviews yet"}</p>
          </div>
        ))}
    </Wrapper>
  );
};

export default Review;
