'use client'
import Link from 'next/link'
import { Card } from 'antd'
import './index.scss'
import { Locale } from '@/util/constanst'

const Contact = ({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: { [key: string]: string }
}) => {
  return (
    <div className='contact_container'>
      <div className='card'>
        <Card
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '0 0 8px 8px',
          }}
        >
          <>
            <div className='content'>
              <p>
                {
                  dictionary[
                    "Would you like to post your company's information for free?"
                  ]
                }{' '}
                <br /> {dictionary['Start with Member Register']}
              </p>{' '}
              <br />
            </div>
            <Link href={`${lang}/login`}>
              <button className='button-contact-page'>
                {dictionary['Account Register']}
              </button>
            </Link>
          </>
        </Card>
      </div>
      <div className='card'>
        <Card
          style={{
            width: '100%',
          }}
        >
          <div className='content'>
            <p>
              {dictionary['Would you like to consult with us?']} <br />{' '}
              {
                dictionary[
                  'Please send an email to vjpconnect@vj-partner.com or click the'
                ]
              }
              &nbsp;"
              {dictionary['Register Consultation']}"&nbsp;
              {dictionary['button and enter your contact information.']}
            </p>
          </div>
          <Link href={`${lang}/contact`}>
            <button className='button-contact-page'>
              {dictionary['Register Consultation']}
            </button>
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default Contact
