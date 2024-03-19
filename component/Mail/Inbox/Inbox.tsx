import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import "./index.scss";
import { MailType } from "../constant";
import { getMailInbox } from "@/store/callApi";
import ModalMail from "../Modal/ModalMail";
import { CurrentUser } from "@/store/login/type";
import { RootState } from "@/store/reducer";
import { getDetailContent, getMailData } from "../util";

const Inbox = ({ dictionary }: { dictionary: { [key: string]: string } }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<MailType[]>([]);
  const [content, setContent] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const user: CurrentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );
  const { email } = user;

  const handleClick = (
    id: string | number,
    status: boolean,
    description: string
  ) => {
    getDetailContent({
      setOpen,
      id,
      setStatus,
      status,
      setContent,
      description,
    });
  };

  const getData = async (email: string) => {
    getMailData(dispatch, getMailInbox, email, setData);
  };

  useEffect(() => {
    if (!open && status) {
      getData(email);
      setStatus(false);
    }
  }, [status, open]);

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
                <th>{dictionary["Name"]}</th>
                <th>{dictionary["Position"]}</th>
                <th>{dictionary["Company"]}</th>
                <th>{dictionary["Email"]}</th>
                <th>{dictionary["Content"]}</th>
                <th style={{ width: "160px", textAlign: "center" }}></th>
                <th>{dictionary["Update"]}</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.fullname}</td>
                  <td>{item.position}</td>
                  <td>
                    <div>
                      <Link
                        href={"/profile/" + item.id_contact}
                        target="_blank"
                      >
                        {item.company_name}
                      </Link>
                    </div>
                  </td>
                  <td>{item.email_contact} </td>
                  <td className="table-column">
                    <span
                      className={
                        item.status
                          ? "table-column-content"
                          : "table-column-content contact_status"
                      }
                    >
                      {item.description}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleClick(item.id, item.status, item.description)
                      }
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

export default Inbox;
