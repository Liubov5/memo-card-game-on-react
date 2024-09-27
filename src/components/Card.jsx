import { IconQuestionMark } from '@tabler/icons-react'
import React from 'react'

const Card = ({index, src, handleClick, status, matched}) => {
  let statusClass = status ? ' active' :''
  let matchedClass = matched ? ' matched' : ''
  return (
      <div className={'card' + matchedClass} onClick={()=>handleClick(index)}>
        <div className={'card__inner ' + statusClass}>
          <div className='card__inner--front'>
              <div style={{backgroundImage: `url(${src})`}} className='card__image'></div>
          </div>
          <div className='card__inner--back'>
            <IconQuestionMark/>
          </div>
        </div>
      </div>
  )
}

export default Card