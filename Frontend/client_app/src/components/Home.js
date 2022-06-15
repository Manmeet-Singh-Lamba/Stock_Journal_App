import React, { useState, useEffect} from 'react'


const Home = ({ user_token })=> {
    const [items, setItems] = useState([])

    useEffect(() => {
        const getItems = async () => {
          const itemsFromServer = await fetchWatchlist()
          setItems(itemsFromServer)
        }
    
        getItems()
      }, []) //dependency array
      
      //fetch Notes
      const fetchWatchlist = async() => {
        const response = await fetch(`http://localhost:5000/get_watchlist`, 
        { method: 'GET',
          headers: {'Content-type': 'application/json', "x-access-token":user_token}
        })
        const data = await response.json()
        
        return data
      }

  return (
    <div>
        <h3> Home </h3>
        {items.map((item) => (
            <li key={item.id}> {item.item_name}</li>
        ))}
    </div>
  )
}

export default Home;