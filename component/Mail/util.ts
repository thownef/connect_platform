import { SetStateAction } from "react";
import { Dispatch } from "redux";
import { updateSeenMail } from "@/store/callApi";
import { endLoading, startLoading } from "@/store/loading/action";
import { STATUS_CODE } from "@/util/constanst";
import { MailType } from "./constant";

export const getMailData = async (
  dispatch: Dispatch,
  getMail: any,
  email: string,
  setData: React.Dispatch<SetStateAction<MailType[]>>
) => {
  try {
    dispatch(startLoading());
    const res = await getMail(email);
    if (res?.status === STATUS_CODE.SUCCESS) {
      setData(res.data.data);
    }
  } finally {
    dispatch(endLoading());
  }
};

type GetDetailContentOptions = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  id: string | number;
  setStatus?: React.Dispatch<SetStateAction<boolean>>;
  status?: boolean;
  setContent: React.Dispatch<SetStateAction<string>>;
  description: string;
};

export const getDetailContent = (options: GetDetailContentOptions) => {
  const { setOpen, id, setStatus, status, setContent, description } = options;
  setOpen(true);
  if (setStatus && status !== undefined && !status) {
    updateSeenMail(id);
    setStatus(true);
  }
  setContent(description);
};
