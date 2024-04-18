import React, { useState } from 'react';
import style from './index.module.scss';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 130) : text}
      <span onClick={toggleReadMore} className={style.read_or_hide}>
        {isReadMore ? '...Read more' : ' Show less'}
      </span>
    </p>
  );
};

export default ReadMore;
