import { Locale } from "@/util/constanst";
import "./index.scss"

const TermPage = ({
	lang,
	dictionary,
  }: {
	lang: Locale;
	dictionary: { [key: string]: string };
  }) => {
  return (
	<div className="term__wrapper">
        <div className="term__title">
          <h1>
            {dictionary['Terms of service']}
          </h1>
        </div>

        <div className="term__section">
          <div className="term__content">
            <p>
              {dictionary['Welcome to the Vietnam - Japan business promotion and connection platform: VJP Connect. Before you start using our services, please read and understand the following terms. Your account on this website includes the following important terms and conditions']}
            </p>
          </div>
        </div>

        <div className="term__section">
          <div className="term__content">
            <h2>
              {dictionary['General Terms']}
            </h2>
            <p>
              {dictionary["1. VJP Connect Platform (hereinafter referred to as 'VJP Connect') is a platform provided by VIET JAPAN PARTNER COOPERATION Company (hereinafter referred to as 'VJP COOPERATION') to support businesses in promoting information and connecting Online Business."]}
            </p>
            <p>
              {dictionary["2. These Terms apply to Businesses that register accounts (hereinafter referred to as 'Users') on VJP Connect's system."]}
            </p>
            <p>
              {dictionary['3. These Terms will be accepted by the User at the time of registration and complied with throughout the process of participating in all activities of VJP Connect or the host company.']}
            </p>
            <p>
              {dictionary['4. User is a company from anywhere in the world with full legality, identity, functionality and business capacity.']}
            </p>
            <p>
              {dictionary['5. Users need to submit the latest documents showing company information and legal representative according to registration information to help us authenticate information.']}
            </p>
            <p>
              {dictionary['6. These Terms of Use shall be subject to and construed in accordance with the laws of Vietnam.']}
            </p>
            <p>
              {dictionary['7. VJP COOPERATION reserves the right to change these Terms and Conditions at any time. In case of any changes to these Terms and Conditions, VJP COOPERATION will notify the User via the email used for account registration. If the User continues to use VJP Connect or does not take measures to cancel the subscription, it will be deemed to have agreed to our changes.']}
            </p>
          </div>
        </div>

        <div className="term__section">
          <div className="term__content">
            <h2>{dictionary['Registration terms']}</h2>
            <p>
              {dictionary['1. Businesses must register an account when they want to participate in activities of VJP Connect or the host company.']}
            </p>
            <p>
              {dictionary['2. Each User is only allowed to register one account.']}
            </p>
            <p>
              {dictionary["3. By registering, Users represent that all information they provide is truthful. If any User's information changes after the registration process has been completed or when requested by VJP Connect's Manager, the User is responsible for immediately updating the correct information to system."]}
            </p>
            <p>
             {dictionary['4. Users will be fully responsible for the laws regarding the content provided to VJP Connect (including intellectual property rights, copyrights,...)']}
            </p>
            <p>
              {dictionary['5. VJP Connect does not guarantee the true identity or truthful representation of a User or the communications between Users. Therefore, each User shall be solely responsible for determining the correctness of the identity of another User before entering into a business cooperation agreement.']}
            </p>
          </div>
        </div>

        <div className="term__section">
          <div className="term__content">
            <h2>
              {dictionary['Object of the contract']}
            </h2>

            <p>
              {dictionary['VJP Connect provides Users with a business introduction page, the ability to search for other Users, exchange via the contact form on the platform (with email), and closed or public groups to exchange and find information. Looking for business partners and Users when registering to use VJP Connect, by default they have allowed VJP Connect and the host company to have full rights to use the information provided by the User for this purpose on the site. website and other media channels without requiring permission for each use.']}
            </p>

            <p>
             {dictionary['VJP Connect and the host company have the right to remove User content or stop providing user accounts due to violation of terms of use and violation of law without prior notice.']}
            </p>

            <p>
              {dictionary['VJP Connect and the host company are not responsible for any damage caused by providing an information promotion and connection platform.']}
            </p>

            <p>
              {dictionary['VJP Connect and the host company are not considered a contractual party when the User conducts business cooperation after connecting through the platform (Except for the case of explicit participation that may be in writing and with consent of interested parties).']}
            </p>
          </div>
        </div>
      </div>
  )
}

export default TermPage