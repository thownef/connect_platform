import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import { Locale } from '@/util/constanst'
import Footer from '@/atomic-component/Footer'
import { getDictionary } from '@/dictionaries/dictionaries'
import Provider from '@/store/provider'
const Zalo = dynamic(() => import('@/atomic-component/Zalo'), {
  loading: () => <p>Loading...</p>,
})
import './globals.scss'
import Spin from '@/atomic-component/Spin'
import HiddenHeader from '@/atomic-component/HiddenHeader/HiddenHeader'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VJP Connect Platform',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dictionary: {
    [key: string]: string;
  } = await getDictionary(params.lang)
  const desc = dictionary["VJP Connect Platform (VJP-CONNECT.COM) is a platform specializing in supporting business promotion, finding partners, experts , and connecting Vietnamese and Japanese company in many fieldsThis platform is operated by Viet Japan Partner Cooperation company - a member of the Japanese business support ecosystem of Viet Japan Partner Group including companies operating in many fields: Trade Promotion, Technology, Development Technology resource development, Recruitment, Design, Marketing, Printing."]

  return (
    <html lang={params.lang} suppressHydrationWarning={true}>
      <title>{metadata.title}</title>
      <meta name="description" content={desc} />
      <meta property="og:image" content="https://vjpconnect.s3.ap-southeast-1.amazonaws.com/logobanner.png" />
      <meta property="og:url" content="https://vjp-connect.com/" />
      <meta property="og:type" content="website" />
      <link
        rel='icon'
        href='https://vj-partner.com/uploads/img/general/1638331162-logo-VJP128x128.png'
        sizes='any'
      />
      <Provider>
        <body className={inter.className}>
          <Spin/>
          <HiddenHeader lang={params.lang} dictionary={dictionary}/>
          <div className='landing__content'>
            {children}
          </div>
          <Zalo />
          <div id='footer'>
            <Footer lang={params.lang} dictionary={dictionary} />
          </div>
        </body>
      </Provider>
    </html>
  )
}
