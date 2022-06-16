import React, { useState, useEffect} from 'react'
import WatchlistItem from './WatchlistItem'


const Home = ({ user_token })=> {
    const [items, setItems] = useState([])

    useEffect(() => {
        const getItems = async () => {
          const itemsFromServer = await fetchWatchlist()
          setItems(itemsFromServer)
        }
    
        getItems()
    }, []) //dependency array
      
    //fetch Watchlist
    const fetchWatchlist = async() => {
    const response = await fetch(`http://localhost:5000/get_watchlist`, 
    { method: 'GET',
      headers: {'Content-type': 'application/json', "x-access-token":user_token}
    })
    const data = await response.json()
        
    return data
    }

    //Delete Item
    const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/deleteitem/${id}`,
    { method: 'DELETE', 
      headers: {"x-access-token": user_token}
    })
      setItems(items.filter((item) => item.id !== id))
    }

    //When visting the watchlist item
    const onClick = (name) =>{
      console.log(name)
      //<Notes />
    }

  return (
    <div>
        <h3> Home </h3>
        <br/>
        <h4> search for ticker symbol here </h4>
        <input type="text" placeholder="Search.." ></input>

        {items.map((item) => (
            <WatchlistItem key={item.id} item = {item} onDelete = {deleteItem} onClick = {onClick}/>
            ))}
    </div>
  )
}

export default Home;