import React from 'react'
import { FaTimes } from 'react-icons/fa'

const WatchlistItem = ({item, onDelete, onClick}) => {
  return (
    <div className= 'note' onClick={() => onClick(item.item_name)}>
          <h3>  {item.item_name} 
                <FaTimes style={{color:'red', cursor: 'pointer' }} 
                onClick = {() => onDelete(item.id)}/>
          </h3>
    </div>
  )
}

export default WatchlistItem