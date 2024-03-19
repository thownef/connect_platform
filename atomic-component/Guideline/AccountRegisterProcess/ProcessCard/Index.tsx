import "./index.scss";
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const ProcessCard = ({
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
      <h1>{title}</h1>
      <h2>{description}</h2>
    </Card>
  );
};

export default ProcessCard;
