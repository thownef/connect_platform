import { StaticImageData } from "next/image";
import logovjp from "../../public/images/logoCompany.png";

export type InfoAbout = {
  id: number;
  title: string;
  content: { id: number, name: string; logo?: string | StaticImageData; url?: string }[];
};

export interface googleMap {
  src: string,
  title: string,
};

export const infovjbc: InfoAbout[] = [
  {
    id: 1,
    title: "Company name",
    content: [
      { id: 1, name: "VIET JAPAN PARTNER COOPERATION CO. LTD (http://vietjapan.co )" },
    ],
  },
  {
    id: 2,
    title: "Headquartes address",
    content: [
      {
        id: 1, name: "No 3.40, The Prince Residence, 17-19-21 Nguyen Van Troi, Street, 11 Ward, Phu Nhuan District, HCM City, Vietnam",
      },
    ],
  },
  { id: 3, title: "Tax code", content: [{ id: 1, name: "317613936" }] },
  { id: 4, title: "Date of incorporation", content: [{ id: 2, name: "20/12/2022" }] },
  { id: 5, title: "Representative", content: [{ id: 3, name: "Vo Duc Thang" }] },
  {
    id: 6,
    title: "Main business sectors",
    content: [
      { id: 1, name: "Organize trade introduction and promotion" },
      { id: 2, name: "Real estate business" },
      { id: 3, name: "Management consulting activities" },
    ],
  },
];

export const infovjbcMap: googleMap = {
  src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.251388433997!2d106.67827727573614!3d10.792048258904032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175294637f60efb%3A0x4d698dcd4fb17cea!2sVIET%20JAPAN%20PARTNER%20COOPERATION%20CO.%2CLTD!5e0!3m2!1sen!2s!4v1705911594572!5m2!1sen!2s",
  title: "VIET JAPAN PARTNER COOPERATION CO. LTD",
};

export const infovjp: InfoAbout[] = [
  {
    id: 1,
    title: "Group name",
    content: [{ id: 1, name: "VIET JAPAN PARTNER GROUP ( VJP Group)" }],
  },
  {
    id: 2,
    title: "Names of member companies",
    content: [
      {
        id: 1, name: "VIET JAPAN PARTNER CO.,LTD",
        logo: logovjp,
        url: "https://vj-partner.com/",
      },
      {
        id: 2, name: "VIET JAPAN DIGITAL CO.,LTD",
        logo: "https://vjpconnect.s3.ap-southeast-1.amazonaws.com/89edeb4063aebdb26191f59a0cfce2f3",
        url: "https://vj-digital.com/",
      },
      {
        id: 3, name: "VIET JAPAN PARTNER COOPERATION CO. LTD",
        logo: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://vietjapan.co/wp-content/uploads/2022/11/Logo-VJPC_Ngang-01.png",
        url: "https://vietjapan.co/",
      },
      {
        id: 4, name: "VIDI MARKETING CO",
        logo: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://vietjapan.co/wp-content/uploads/2022/11/Logo-VJPC_Ngang-01.png",
        url: "https://vj-digital.com/",
      },
    ],
  },
  {
    id: 3,
    title: "Headquartes address",
    content: [
      {
        id: 1, name: "Room 22, Building 8, CVPM, Quang Trung, Tan Hung Thuan, District 12, Ho Chi Minh City",
      },
    ],
  },
  { id: 4, title: "Representative", content: [{ id: 1, name: "Vo Duc Thang" }] },
  {
    id: 5,
    title: "Main business sectors",
    content: [
      { id: 1, name: "Develop Japanese standard IT engineer resources" },
      { id: 2, name: "Software Development" },
      { id: 3, name: "Promoting trade and investment between Vietnam and Japan" },
    ],
  },
];

export const infovjpMap: googleMap = {
  src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.427414435068!2d106.62680307573652!3d10.855060057736967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293582e05b3f%3A0xf36e2a20d6e9aa63!2sVIET%20JAPAN%20PARTNER%20CO.%2C%20LTD!5e0!3m2!1sen!2s!4v1705911934460!5m2!1sen!2s",
  title: "VIET JAPAN PARTNER",
};
