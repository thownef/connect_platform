'use client'
import { useState, useEffect } from 'react'
import { Locale, STATUS_CODE } from '@/util/constanst'
import { JPCompany } from '@/store/dashboard/type'
import Col from '@/atomic-component/Col'
import Company from '@/atomic-component/Company/Company'
import { getVnCompany } from '@/store/callApi'
import './index.scss'

function CompanyListVN({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: { [key: string]: string }
}) {
  const [vietNamCompany, setVietNamCompany] = useState<JPCompany[]>([])

  useEffect(() => {
    const fetchData = async ()=>{
      const res = await getVnCompany()
      if(res?.status === STATUS_CODE.SUCCESS){
        setVietNamCompany(res.data.data)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="company__presentative">
      <div className="company__presentative--content">
        {vietNamCompany?.map((item: JPCompany) => (
          <Col xl={6} lg={6} md={12} className='company__wrapper' key={item.id}>
            <Company lang={lang} dictionary={dictionary} data={item} />
          </Col>
        ))}
      </div>
    </div>
  )
}

export default CompanyListVN
