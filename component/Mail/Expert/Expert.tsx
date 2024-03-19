import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser } from "@/store/login/type";
import { RootState } from "@/store/reducer";
import { getDetailContent, getMailData } from "../util";
import { getMailSentExpert } from "@/store/callApi";
import ModalMail from "../Modal/ModalMail";
import { MailType } from "../constant";

const Expert = ({ dictionary }: { dictionary: { [key: string]: string } }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<MailType[]>([]);
  const [content, setContent] = useState<string>("");
  const [open, setOpen] = useState(false);
  const user: CurrentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );
  const { email } = user;

  const handleClick = (id: string | number, description: string) => {
    getDetailContent({ setOpen, id, setContent, description });
  };

  const getData = async (email: string) => {
    getMailData(dispatch, getMailSentExpert, email, setData);
  };

  useEffect(() => {
    if (email) {
      getData(email);
    }
  }, [email]);
  return (
    <>
      <div className="list-contact-container-right">
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>{dictionary["Company"]}</th>
                <th>{dictionary["Content"]}</th>
                <th></th>
                <th>{dictionary["Update"]}</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.company_name}</td>
                  <td className="table-column">
                    <span className="table-column-content">{item.content}</span>
                  </td>
                  <td style={{ width: 200 }}>
                    <button
                      onClick={() => handleClick(item.id, item.content)}
                      className="btnInbox"
                    >
                      {dictionary["Detail"]}
                    </button>
                  </td>
                  <td>{item.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <ModalMail content={content} isOpen={open} setOpen={setOpen} />
    </>
  );
};

export default Expert;
