import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import style from "./index.module.scss";
import Link from 'next/link';

const FeatureCard = ({
  title,
  icon,
}: {
  title: string,
  icon: IconDefinition
}) => {
  return (
    <Card className={style.card} hoverable={false} >
      <FontAwesomeIcon className={style.card__icon} icon={icon} size={"4x"} />
      <div className={style.card__content}>
        <p>{title}</p>
      </div>
    </Card>
  );
};

export default FeatureCard;
