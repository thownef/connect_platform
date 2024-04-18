import React, { useEffect } from 'react'
import './index.scss'

const Expert = () => {
  useEffect(() => {}, [])
  return (
    <>
      <div className='expert'>
        <div className='expert-container'>
          <div className='expert-search'>
            <input type='text' placeholder='Search Item .........' />
          </div>
          <div className='expert-btn'>
            <button>search</button>
          </div>
        </div>
        <div className='expert-content'></div>
      </div>
    </>
  )
}

export default Expert
