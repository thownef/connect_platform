import "./index.scss";
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const FeatureCard = ({
  title,
  description,
  icon
}: {
  title: string,
  description: string
  icon: IconDefinition
}) => {
  return (
    <Card className="feature-card" hoverable={false} >
      <FontAwesomeIcon className="icon" icon={icon} size={"4x"} />
      <div className="box-card">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </Card>
  );
};

export default FeatureCard;
