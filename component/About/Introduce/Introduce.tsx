import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Col, Row } from "antd";
import { InfoAbout, googleMap, infovjbc } from "../constant";

const Introduce = ({
  dictionary,
  data,
  googleMap,
  logo,
}: {
  dictionary: { [key: string]: string };
  data: InfoAbout[];
  googleMap: googleMap;
  logo: StaticImageData;
}) => {
  return (
    <div className="aboutus__section">
      <div className="aboutus__content">
        <h2>{dictionary["Introducing the operating company"]}</h2>
        <Row className="aboutus__content--company" justify={"center"}>
          <Image src={logo} alt="" />
        </Row>

        {data.map((item: InfoAbout) => (
          <Row className="aboutus__content--item" align="middle" key={item.id}>
            <Col span={8} className="aboutus__content--item-title">
              {dictionary[item.title]}
            </Col>
            <Col span={16} className="aboutus__content--item-des">
              {item.content.map((contentItem, index) => (
                <Row
                  justify={"center"}
                  align={"middle"}
                  key={`${item.id}-${index}`}
                >
                  {contentItem.url ? (
                    <Link href={contentItem.url}>
                      <p>{dictionary[contentItem.name]}</p>
                    </Link>
                  ) : (
                    <p>{dictionary[contentItem.name]}</p>
                  )}
                </Row>
              ))}
            </Col>
            <hr />
          </Row>
        ))}

        <h3>{dictionary["Google map"]}</h3>

        <iframe
          src={googleMap.src}
          title={googleMap.title}
          width={"100%"}
          height={450}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Introduce;
