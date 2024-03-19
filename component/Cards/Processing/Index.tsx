import { Card } from 'antd';
import style from "./index.module.scss";

const ProcessCard = ({
  title,
  contents,
}: {
  title: string,
  contents: string[]
}) => {
  let symbol= "• ";
  return (
    <Card className={style.card} title={title} bordered={true}>
        {
          contents.map(function(content, key) {
            return (<span key={key}>{symbol + content}</span>)
          })
        }
    </Card>
  );
};

export default ProcessCard;
