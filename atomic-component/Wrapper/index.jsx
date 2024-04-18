import style from './index.module.scss';

const Wrapper = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default Wrapper;
