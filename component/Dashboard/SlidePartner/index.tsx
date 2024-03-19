import { partnerArr, Partner } from '../constant'
import './index.scss'

const SlidePartner = () => {
  return (
    <div className='slide_partner' id='professional'>
      <div className='slide_track'>
        {[...partnerArr, ...partnerArr].map((partner: Partner, idx) => (
          <div className='slide_image client' key={`${partner.img}_${idx}`}>
            {partner.have_link ? (
              <div className='image-client'>
                <a href={partner.link} target='_blank'>
                  <img src={partner.img} alt='' />
                </a>
              </div>
            ) : (
              <div className='image-client'>
                <img src={partner.img} alt='' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlidePartner
