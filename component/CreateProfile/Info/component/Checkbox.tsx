import { useEffect } from "react";
import Image from "next/image";
import logoVN from "../../../../public/images/logo2.png";
import logoEN from "../../../../public/images/logo3.png";
import logoJP from "../../../../public/images/logo4.png";
import { CurrentUser } from "@/store/login/type";

const Checkbox = ({
  user,
  setCheckboxValue,
  setIsCoutry,
  isCountry,
  handleChange,
  dictionary,
}: {
  user: CurrentUser;
  setCheckboxValue: React.Dispatch<React.SetStateAction<string[]>>;
  setIsCoutry: React.Dispatch<React.SetStateAction<number | undefined>>;
  isCountry: number | undefined;
  handleChange: any;
  dictionary: { [key: string]: string };
}) => {
  useEffect(() => {
    if (user.country === "Japan") {
      setCheckboxValue(["japan"]);
      setIsCoutry(1);
    } else if (user.country === "Viet Nam") {
      setCheckboxValue(["vietnam"]);
      setIsCoutry(2);
    }
  }, [user?.country]);
  return (
    <div className="flag_country_container">
      <div className="flag_country">
        <input
          type="checkbox"
          value="vietnam"
          id="vietnam"
          name="languages"
          defaultChecked={isCountry === 2}
          disabled={isCountry === 2}
          onChange={handleChange}
        />
        <label htmlFor="vietnam">
          <div className="flag_icon">
            <Image src={logoVN} alt="" />
          </div>
          <div className="title">{dictionary["Vietnamese"]}</div>
        </label>
      </div>
      <div className="flag_country">
        <input
          type="checkbox"
          value="japan"
          id="japan"
          defaultChecked={isCountry === 1}
          disabled={isCountry === 1}
          name="languages"
          onChange={handleChange}
        />

        <label htmlFor="japan">
          <div className="flag_icon">
            <Image src={logoJP} alt="" />
          </div>
          <div className="title">{dictionary["Japanese"]}</div>
        </label>
      </div>
      <div className="flag_country">
        <input
          type="checkbox"
          value="english"
          id="english"
          name="languages"
          onChange={handleChange}
        />
        <label htmlFor="english">
          <div className="flag_icon">
            <Image src={logoEN} alt="" />
          </div>
          <div className="title">{dictionary["English"]}</div>
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
