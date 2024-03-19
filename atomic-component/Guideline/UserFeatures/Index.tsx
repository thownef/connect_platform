import "./index.scss";
import { Col, Row } from 'antd';
import {
  faFilePen,
  faFolderPlus,
  faHandshake,
  faHeadset,
  faRegistered,
} from '@fortawesome/free-solid-svg-icons';
import FeatureCard from "./FeatureCard/Index";

const Card: React.FC<{ children: React.ReactNode; value: number }> = ({children, value}) => (
  <div>{children}</div>
);

const UserFeatures = ({
  dictionary
}: {
  dictionary: { [key: string]: string };
}) => {
  return (
    <div className="user-features">
      <div className="feature-row">
        <Card value={1}><p></p></Card>
        <FeatureCard
          title={dictionary['Register an account']}
          description=""
          icon={faRegistered}>
        </FeatureCard>
        <FeatureCard
          title={dictionary['Create company profile']}
          description=""
          icon={faFolderPlus}>
        </FeatureCard>
        <FeatureCard
          title={dictionary['Edit company profile']}
          description=""
          icon={faFilePen}>
        </FeatureCard>
      </div>
      <div className="feature-row">
        <FeatureCard
          title={dictionary['Register an account']}
          description=""
          icon={faRegistered}>
        </FeatureCard>
        <FeatureCard
          title={dictionary['Create company profile']}
          description=""
          icon={faFolderPlus}>
        </FeatureCard>
      </div>
    </div>
  );
};


export default UserFeatures;
