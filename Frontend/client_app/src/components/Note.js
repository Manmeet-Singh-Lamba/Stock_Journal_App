import { FaTimes } from 'react-icons/fa'

const Note = ({ note, onDelete })=> {
  //const typeclass = {'note ${note.rating === 'Buy' ? 'buy':'sell'}'}
    return (
        <div className={`note ${note.rating === 'Buy' ? 'buy':`${note.rating === 'Sell' ? 'sell': ''}`}`}
        >
          <h3> Stock Price: 
            {note.stock_price} 
            <FaTimes style={{color:'red', cursor: 'pointer' }} onClick = {() => onDelete(note.id)}/>
          </h3>
          <h2>{note.stock_symbol}</h2>
          <h3> Rating: {note.rating} </h3>
          <h2> Price date: {note.price_date}</h2>
          <h3> Reason: {note.reason}</h3>
          <h3> created on: {note.date_posted}</h3>
        </div>
      );
}


export default Note;