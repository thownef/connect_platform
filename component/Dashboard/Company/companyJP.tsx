'use client'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Locale, DOMAIN } from '@/util/constanst'
import './index.scss'
import { callApiGetJPCompany } from '@/store/dashboard/action'
import { JPCompany } from '@/store/dashboard/type'
import { RootState } from '@/store/reducer'
import Company from '@/atomic-component/Company/Company'
import Col from '@/atomic-component/Col'

function CompanyListJP({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: { [key: string]: string }
}) {
  const dispatch = useDispatch()
  const jpCompaniesRes: JPCompany[] = useSelector(
    (state: RootState) => state.dashBoard.jpCompany
  );

  const [jpCompanies, setJapanCompanys] = useState<JPCompany[]>([])
  useEffect(() => {
    setJapanCompanys(jpCompaniesRes)
  }, [jpCompaniesRes])
  
  useEffect(() => {
    dispatch(callApiGetJPCompany())
  }, [])

  return (
    <div className="company__presentative">
      <div className="company__presentative--content">
        {jpCompanies?.map((item: JPCompany) => (
          <Col xl={6} lg={6} md={12} className='company__wrapper' key={item.id}>
            <Company lang={lang} dictionary={dictionary} data={item} />
          </Col>
        ))}
      </div>
    </div>
  );
}

export default CompanyListJP