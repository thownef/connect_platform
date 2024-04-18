import style from './index.module.scss'
const Header = ({ type }: { type: string }) => {
  return (
    <div className={style.wrapper}>
      <img
        src={
          type === 'landing' ? `images/logobanner.png` : `images/posterVJBC.png`
        }
        alt='banner'
      />
    </div>
  )
}

export default Header
