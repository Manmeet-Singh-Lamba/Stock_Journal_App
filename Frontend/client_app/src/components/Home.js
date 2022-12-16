import React, { useState, useEffect } from "react";
import WatchlistItem from "./WatchlistItem";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "./Button";

const Home = ({ user_token }) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getItems = async () => {
      const itemsFromServer = await fetchWatchlist();
      setItems(itemsFromServer);
    };

    getItems();
  }, []); //dependency array

  //fetch Watchlist
  const fetchWatchlist = async () => {
    const response = await fetch(`http://localhost:5000/get_watchlist`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": user_token,
      },
    });
    const data = await response.json();

    if (response.status === 401) {
      sessionStorage.removeItem("user_token");
      navigate("/login");
    }

    return data;
  };

  //Delete Item
  const deleteItem = async (id) => {
    await fetch(`http://127.0.0.1:5000/deletesymbol/${id}`, {
      method: "DELETE",
      headers: { "x-access-token": user_token },
    });
    setItems(items.filter((item) => item.id !== id));
  };

  //Add Item
  const addItem = async (item) => {
    console.log(item);
    const response = await fetch(`http://localhost:5000/addsymbol`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-access-token": user_token,
      },
      body: JSON.stringify(item),
    });

    if (response.status === 401) {
      sessionStorage.removeItem("user_token");
      navigate("/login");
    }

    const data = await response.json();

    if (data["message"] == null) {
      setItems([...items, data]);
    } else {
      alert(data["message"]);
    }
  };

  const searchInput = {
    item_name: "PP",
  };

  //When visting the watchlist item
  const onClick = (name) => {
    navigate(`/notes/${name}`);
    console.log(name);
  };

  return (
    <div>
      <h3> Home </h3>
      <br />

      <div>
        <SearchBar user_token={user_token} setItems={setItems} items={items} />
        {/* <div className="button">
          <Button
            color="purple"
            text="Add ticker to watchlist"
            onClick={() => addItem(searchInput)}
          />
        </div> */}
      </div>

      {items.map((item) => (
        <WatchlistItem
          key={item.id}
          item={item}
          onDelete={deleteItem}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default Home;
