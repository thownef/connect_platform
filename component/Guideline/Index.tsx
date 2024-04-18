"use client";
import style from "./index.module.scss";
import Link from "next/link";
import { useRef } from "react";
import { Locale } from "@/util/constanst";
import {
  faFilePen,
  faFolderPlus,
  faHandshake,
  faHeadset,
  faRegistered,
} from '@fortawesome/free-solid-svg-icons';
const SectionBlock = dynamic(() => import("../SectionBlocks"), {
  ssr: false,
});
import FeatureCard from "../Cards/Feature/Index";
import ProcessCard from "../Cards/Processing/Index";
import GuideBox from "../boxs/GuideBox";
import SubHeader from "../SubHeader";
import GuideCard from "../Cards/Guide/Index";
// images
import dkvn from "../../public/images/dk_vn.png";
import dken from "../../public/images/dk2_vn.png";
import dkjp from "../../public/images/dk_en.png";
import dk2vn from "../../public/images/dk2_en.png";
import dk2en from "../../public/images/dk2_en.png";
import dk2jp from "../../public/images/dk2_jp.png";
import dnvn from "../../public/images/dn_vn.png"
import dnen from "../../public/images/dn_en.png";
import dnjp from "../../public/images/dn_jp.png";
import dn2vn from "../../public/images/dn2_vn.png"
import dn2en from "../../public/images/dn2_en.png";
import dn2jp from "../../public/images/dn2_jp.png";
import dn3vn from "../../public/images/dn3_vn.png"
import dn3en from "../../public/images/dn3_en.png";
import dn3jp from "../../public/images/dn3_jp.png";
import shs2vn from "../../public/images/shs2_vn.png";
import shs2en from "../../public/images/shs2_en.png";
import shs2jp from "../../public/images/shs2_jp.png";
import shs3vn from "../../public/images/shs3_vn.png";
import shs3en from "../../public/images/shs3_en.png";
import shs3jp from "../../public/images/shs3_jp.png";
import shs4vn from "../../public/images/shs4_vn.png";
import shs4en from "../../public/images/shs4_en.png";
import shs4jp from "../../public/images/shs4_jp.png";
import lhvn from "../../public/images/lh_vn.png";
import lhen from "../../public/images/lh_en.png";
import lhjp from "../../public/images/lh_jp.png";
import lh1vn from "../../public/images/lh1_vn.png";

import lhhtvn from "../../public/images/lhht_vn.png";
import lhhten from "../../public/images/lhht_en.png";
import lhhtjp from "../../public/images/lhht_jp.png";
import ContactForm from "@/atomic-component/ContactForm/Index";
import dynamic from "next/dynamic";

const UserManual = ({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: { [key: string]: string };
}) => {
  
  const myRef = useRef<HTMLInputElement>(null);
  const scrollToTargetAdjusted = (id:string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth"});
  }

  let processing = [
    {
      "step": dictionary["Step"],
      'title':  dictionary["Registration"],
      'content': [
        dictionary["Register for free"],
        dictionary["Waiting for review"],
        dictionary["Pay the fee when the screening results come out (only if you have registered a paid package)"]
      ]
    },
    {
      "step": dictionary["Step"],
      'title': dictionary["Create a company profile"],
      'content': [
        dictionary["Login"],
        dictionary["Create Company profile"],
        dictionary["Inform us via Zalo OA/Line OA"],
        dictionary["Waiting for review"]
      ]
    },
    {
      "step": dictionary["Step"],
      'title': dictionary["contact, connect"],
      'content': [
        dictionary["Contact other companies"],
        dictionary["Contact an expert"],
        dictionary["Past messages can be checked"],
      ]
    }
  ];
  let features = [
    {
      'title' : dictionary["Register an account"],
      'icon' : faRegistered,
      'href' : "guide-register-account"
    },
    {
      'title' : dictionary["Create company profile"],
      'icon' : faFolderPlus,
      'href' : "guide-create-company-profile"
    },
    {
      'title' : dictionary["Edit company profile"],
      'icon' : faFilePen,
      'href' : "guide-edit-company-profile"
    },
    {
      'title' : dictionary["Contact other companies"],
      'icon' : faHandshake,
      'href' : "guide-contact-other-companies"
    },
    {
      'title' : dictionary["Contact support department"],
      'icon' : faHeadset,
      'href' : "guide-contact-support"
    },
  ];

  let loginLink, contactLink, dkImg, dk2Img, dnImg, dn2Img, dn3Img, shs2Img, shs3Img, shs4Img, lhImg, lh1Img, lhhtImg;
  switch (lang) {
    case 'vi':
      loginLink = 'https://vjp-connect.com/login';
      contactLink = 'https:///vjp-connect.com/contact';
      dkImg = dkvn;
      dk2Img = dk2vn;
      dnImg = dnvn;
      dn2Img = dn2vn;
      dn3Img = dn3vn;
      shs2Img = shs2vn;
      shs3Img = shs3vn;
      shs4Img = shs4vn;
      lhImg = lhvn;
      lh1Img = lh1vn;
      lhhtImg = lhhtvn;
      break;
    case 'en':
      loginLink = 'https://vjp-connect.com/en/login';
      contactLink = 'https:///vjp-connect.com/en/contact';
      dkImg = dken;
      dk2Img = dk2en;
      dnImg = dnen;
      dn2Img = dn2en;
      dn3Img = dn3en;
      shs2Img = shs2en;
      shs3Img = shs3en;
      shs4Img = shs4en;
      lhImg = lhen;
      lh1Img = lh1vn;
      lhhtImg = lhhten;
      break;
    case 'ja':
      loginLink = 'https://vjp-connect.com/jp/login';
      contactLink = 'https:///vjp-connect.com/jp/contact';
      dkImg = dkjp;
      dk2Img = dk2jp;
      dnImg = dnjp;
      dn2Img = dn2jp;
      dn3Img = dn3jp;
      shs2Img = shs2jp;
      shs3Img = shs3jp;
      shs4Img = shs4jp;
      lhImg = lhjp;
      lh1Img = lh1vn;
      lhhtImg = lhhtjp;
      break;
  }

  return (
    <>
      <div className={style.guideline}>
        <h1 className={style.guideline_title}>{dictionary["Manual for companies"]}</h1>
        <SubHeader subTitle={dictionary["Account registration process"]}/>
        <SectionBlock>
          {
            processing.map((process, key) => (
              <div key={key} className={style.guideline_process}>
                <ProcessCard
                  title={process.step + " " + (key + 1) + ": " +  process.title}
                  contents={process.content}/>
              </div>
            ))
          }
        </SectionBlock>

        <SubHeader subTitle={dictionary["User features"]}/>
        <SectionBlock>
          {
            features.map((feature, key) => (
              <div onClick={() => scrollToTargetAdjusted(feature.href)} key={key} className={style.guideline_features}>
                <FeatureCard
                  key={key}
                  title={feature.title}
                  icon={feature.icon} />
              </div>
            ))
          }
        </SectionBlock>

        {/* Guide image */}
        <SectionBlock>
          <div id='guide-register-account' className={style.guideline_steps}>
            <GuideBox>
              <div className={style.guideline_steps_head}>
                <SubHeader subTitle={dictionary["Register an account"]}/>
              </div>
              <GuideCard image={dkvn}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 1:"}</strong>
                    <span>
                      {
                        dictionary['Click'] +
                        ' " ' +
                        dictionary['Register an account'] +
                        ' " ' + 
                        dictionary['from the homepage.']
                      }
                    </span>
                </div>
              </GuideCard>

              <div className={style.guideline_steps_line}><hr /></div>

              <GuideCard image={dk2Img}>
              <div className={style.guideline_steps_content}>
                <strong>{dictionary["Step"] +" 2:"}</strong>
                  <span>{ lang !== 'ja' ? dictionary["Access to"] : "" }
                    <Link style={{color:"#3b71ca"}} href={`/${lang}/login`} key="login">{loginLink}</Link>
                    { lang === 'ja' ? dictionary["Access to"] : "" }
                  </span>
                  <span>{dictionary["Select the “Register” button."]}</span>
                </div>
              </GuideCard>
            </GuideBox>
          </div>
        </SectionBlock>

        <SectionBlock>
          <div id='guide-create-company-profile' className={style.guideline_steps}>
            <GuideBox>
              <div className={style.guideline_steps_head}>
                <SubHeader subTitle={dictionary["Create company profile"]}/>
              </div>
              <GuideCard image={dnImg}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 1:"}</strong>
                  <span>
                    { lang !== 'ja' ? dictionary['Login at link'] : "" }
                    <Link style={{color:"#3b71ca"}} href={`/${lang}/login`} key="login">{loginLink}</Link>
                    { lang === 'ja' ? dictionary['Login at link'] : "" }
                    { dictionary['(After receiving approval notification)']}
                  </span>
                </div>
              </GuideCard>

              <div className={style.guideline_steps_line}><hr /></div>

              <GuideCard image={dn2Img}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 2:"}</strong>
                  <span>{dictionary['Select “User Profile” on the home screen.']}</span>
                  <span>{dictionary['Select “Create Profile” on the screen that opens.']}</span>
                </div>
              </GuideCard>

              <div className={style.guideline_steps_line}><hr /></div>

              <GuideCard image={dn3Img}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 3:"}</strong>
                  <span>{dictionary['Enter the information on the “Profile” screen and press the “Create Profile” button.']}</span>
                </div>
              </GuideCard>
            </GuideBox>
          </div>
        </SectionBlock>

        <SectionBlock>
          <div id='guide-edit-company-profile' className={style.guideline_steps}>
            <GuideBox>
              <div className={style.guideline_steps_head}>
                <SubHeader subTitle={dictionary["Edit company profile"]}/>
              </div>
              <GuideCard image={dnImg}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 1:"}</strong>
                  <span>
                    { lang !== 'ja' ? dictionary['Login at link'] : ""}
                    <Link style={{color:"#3b71ca"}} href={`/${lang}/login`} key="login">{loginLink}</Link>
                    { lang === 'ja' ? dictionary['Login at link'] : ""}
                  </span>
                </div>
              </GuideCard>

              <div className={style.guideline_steps_line}><hr /></div>

              <GuideCard image={shs2Img}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 2:"}</strong>
                  <span>{dictionary['Select “Profile” on the home screen.']}</span>
                </div>
              </GuideCard>

              <div className={style.guideline_steps_line}><hr /></div>

              <GuideCard image={shs3Img}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 3:"}</strong>
                  <span>{dictionary['Select the “Edit” button.']}</span>
                </div>
              </GuideCard>

              <div className={style.guideline_steps_line}><hr /></div>

              <GuideCard image={shs4Img}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 4:"}</strong>
                  <span>{dictionary['Enter the information and press the “Save Changes” button.']}</span>
                </div>
              </GuideCard>
            </GuideBox>
          </div>
        </SectionBlock>

        <SectionBlock>
          <div id='guide-contact-other-companies' className={style.guideline_steps}>
            <GuideBox>
              <div className={style.guideline_steps_head}>
                <SubHeader subTitle={dictionary["Contact other companies"]}/>
              </div>
              <GuideCard image={lhImg}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 1:"}</strong>
                  <span>
                    {
                      dictionary['You can enter contact information and other information while logged in.']
                    }
                  </span>
                </div>
              </GuideCard>

              <div className={style.guideline_steps_line}><hr /></div>

              <GuideCard image={lh1Img}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 2:"}</strong>
                  <span>{dictionary["The system will send the email to the recipient's mailbox and at the same time CC the sender."]}</span>
                </div>
              </GuideCard>
            </GuideBox>
          </div>
        </SectionBlock>

        <SectionBlock>
          <div id='guide-contact-support' className={style.guideline_steps}>
            <GuideBox>
              <div className={style.guideline_steps_head}>
                <SubHeader subTitle={dictionary["Contact support department"]}/>
              </div>
              <GuideCard image={lhImg}>
                <div className={style.guideline_steps_content}>
                  <strong>{dictionary["Step"] +" 1:"}</strong>
                  <span>
                    {lang !=='ja' ? dictionary["visits"] : ""}
                    <Link style={{color:"#3b71ca"}} href={`/${lang}/contact`} key="contact">{contactLink}</Link>
                    {lang ==='ja' ? dictionary["visits"] : ""}
                  </span>
                </div>
              </GuideCard>
            </GuideBox>
          </div>
        </SectionBlock>
        <SectionBlock>
          <div className={style.guideline_contact}>
            <strong>
              <p>This is a guide on how to register and use the current features on the VJP Connect platform.</p>
              <p>If you have any questions, you can contact Zalo OA/Line OA hotline or fill out the form below for assistance.</p>
            </strong>
          </div>
        </SectionBlock>
      </div>
      <ContactForm lang={lang} dictionary={dictionary} page="contact" />
    </>
  );
};

export default UserManual;
