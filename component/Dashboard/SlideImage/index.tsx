'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { Locale } from '@/util/constanst'
import { callApiGetExpert } from '@/store/dashboard/action'
import { Expert, initExpert, langList } from '../constant'
import { getSliderUserNm } from '../util'
import './index.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { RootState } from '@/store/reducer'

const SlideImage = ({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: { [key: string]: string }
}) => {
  const dispatch = useDispatch()
  const [expert, setExpert] = useState<Expert[]>([initExpert])
  const router = useRouter()
  const expertRes: Expert[] = useSelector((state: RootState) => {
    return state.dashBoard.expert
  })

  const handleDetailClick = (id: string) => {
    router.push(`${lang}/expert/${id}`)
  }
  useEffect(() => {
    setExpert(expertRes)
  }, [expertRes])
  useEffect(() => {
    dispatch(callApiGetExpert())
  }, [])

  return (
    <>
      <Swiper
        modules={[Navigation]}
        loop={true}
        navigation={true}
        pagination={true}
        breakpoints={{
          390: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        <div className='slide_container'>
          <div className='slide_track'>
            {expert &&
              expert.map((item: Expert) => (
                <div key={item.id} className='slide_image'>
                  <SwiperSlide key={`${item.id}_${item.user_name}`}>
                    <div
                      className='form-content-slider'
                      onClick={() => handleDetailClick(item.id)}
                    >
                      <div className='content-slider-user'>
                        <div className='content-slider-user-image'>
                          <img src={item.image} alt='user-image' />
                        </div>
                        <div className='content-slider-name'>
                          {
                            <>
                              <h3>{getSliderUserNm(lang, item).specialize}</h3>
                              <span className='slider__expert--name'>
                                ({getSliderUserNm(lang, item).user_name})
                              </span>
                            </>
                          }
                        </div>
                        <div className='content-expert-eye'>
                          <div className='content-expert-show'>
                            <CaretLeftOutlined className='icon-expert' />
                            <button>{dictionary['View profile']}</button>
                            <CaretRightOutlined className='icon-expert' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              ))}
          </div>
        </div>
      </Swiper>
    </>
  )
}

export default SlideImage
