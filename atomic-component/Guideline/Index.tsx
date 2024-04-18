import AccountRegisterProcess from "./AccountRegisterProcess/Index";
import UserFeatures from "./UserFeatures/Index";
import "./index.scss";

const Guideline = ({
  dictionary
}: {
  dictionary: { [key: string]: string };
}) => {
  return (
  <div className="container">
      <div className="guide__wrapper">
        <div className="guide__title">
          <h1>{dictionary['Manual for companies']}</h1>
        </div>
        <div className="guide__section__pc">
          <AccountRegisterProcess dictionary={dictionary}></AccountRegisterProcess>
          <UserFeatures dictionary={dictionary}></UserFeatures>
        </div>
      </div>
    </div>
  );
};

export default Guideline;
