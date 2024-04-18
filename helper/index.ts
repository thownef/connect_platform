import { langList } from "@/component/Dashboard/constant"
import { UPLOAD_S3 } from "@/util/constanst"
import axios from "axios"

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

export const scrollToTopSearch = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

export const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    left: 0,
    behavior: 'smooth',
  })
}

export const createMarkup = (item : string) => {
  return {
    __html: item,
  };
};

export const checkNull = (value: string) => {
  return value === 'null' || value === null ? '' : value;
};

export const upload = async (file:  any, id: string | number) => {
  const imgUrl = file;
  const res = await axios.post(`${UPLOAD_S3}s3Url`, { id: id });
  await fetch(res.data.url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/png',
    },
    body: imgUrl,
  });
  return res.data.url.split('?')[0];
};

export const removeImage = async (nameImage: string) => {
  await axios.delete(
    `${UPLOAD_S3}s3Url/delete?imageName=${nameImage
      ?.split('/')
      .slice(3)
      .join('/')}`
  );
};

export const useNeed = (lang: string, item: any) => {
  let content: string = "";
  switch (lang) {
    case "vi":
      content = item?.needs_vn;
      break;
    case "en":
      content = item?.needs_en;
      break;
    case "ja":
      content = item?.needs_jp;
      break;
    default:
      break;
  }
  return content;
};