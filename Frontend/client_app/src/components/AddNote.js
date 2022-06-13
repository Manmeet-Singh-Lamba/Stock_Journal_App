import {useState} from 'react'

const AddNote = ({ onAdd })=> {
    const [stock_price, setStock_price] = useState('')
    const [stock_symbol, setStock_symbol] = useState('')
    const [price_date, setPrice_date] = useState('')
    const [rating, setRating] = useState('')
    const [reason, setReason] = useState('')
    const [date_posted, setCreated_on] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!stock_price || !stock_symbol || !price_date || !reason || !rating || !date_posted){
            alert('Please add all info')
            return
        }

        onAdd({stock_price, stock_symbol, price_date, rating, reason, date_posted})

        setStock_price('')
        setStock_symbol('')
        setPrice_date('')
        setRating('')
        setReason('')
        setCreated_on('')
        
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>
                    Stock Price
                </label>
                <input type='number' 
                        placeholder='Add price' 
                        value={stock_price} 
                        onChange={(e) => setStock_price(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>
                    Stock symbol
                </label>
                <input type='text' 
                        placeholder='Add symbol' 
                        value={stock_symbol} 
                        onChange={(e) => setStock_symbol(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>
                    Price Date
                </label>
                <input type='date' 
                        placeholder='Add Date' 
                        value={price_date} 
                        onChange={(e) => setPrice_date(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>
                    Rating
                </label>
                <input type='text' 
                        placeholder='Add Rating(Buy or Sell or Wait)' 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>
                    Reason
                </label>
                <input type='text' 
                        placeholder='Add reason for your rating and thoughts about the stock' 
                        value={reason} 
                        onChange={(e) => setReason(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>
                    created on
                </label>
                <input type='date' 
                        placeholder='Add Task' 
                        value={date_posted}
                        onChange={(e) => setCreated_on(e.target.value)}/>
            </div>

            <input type='submit' value='Save note' className= 'btn btn-block' />

        </form>
  );
}



export default AddNote;