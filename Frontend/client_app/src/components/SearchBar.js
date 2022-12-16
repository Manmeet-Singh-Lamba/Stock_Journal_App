import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

// to search for a stock ticker symbol
const SearchBar = ({ user_token, setItems, items }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getresults = async () => {
      await fetchSearchResult(searchInput);
    };

    getresults();
  }, [searchInput]); //dependency array

  //fetch search result
  const fetchSearchResult = async (symbol) => {
    // const response = await fetch(`http://localhost:5000/searchsymbol/${symbol}`,
    // { method: 'GET',
    //   headers: {'Content-type': 'application/json', "x-access-token":user_token}
    // })
    // const data = await response.json()

    // if(response.status === 401){
    // sessionStorage.removeItem("user_token")
    // navigate("/login")
    // }
    if (symbol === "") {
      setSearchResult([]);
    } else {
      const response = await fetch(
        `http://localhost:5000/searchsymbol/${symbol}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "x-access-token": user_token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if ("bestMatches" in data) {
            console.log(data["bestMatches"]);
            setSearchResult(data["bestMatches"]);
          } else {
            console.log(data["Note"]);
            setSearchResult([
              {
                "1. symbol":
                  "Sorry!! you searched too many times in one minute, buy premium for unrestricted access",
                "2. name": "",
                "3. type": "",
                "4. region": "",
              },
            ]);
          }
        });
    }
    //.catch(response.status === 404)

    // if(response.status === 404){
    //     setSearchResult({"1. symbol":"Not found", "2. name": ""})
    //     data = {"1. symbol":"Not found", "2. name": ""}
    // }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    if (searchInput.length > 0) {
      // const searchResult = fetchSearchResult(searchInput)
      // setSearchResult(searchResult)
      // console.log(searchResult)
    }
  };

  const AddItem = async (item) => {
    if (item == "" || item == "") return;

    const response = await fetch(`http://localhost:5000/addsymbol`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-access-token": user_token,
      },
      body: JSON.stringify({ item_name: item }),
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

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search Ticker symbol here"
        onChange={handleChange}
        value={searchInput}
        // style = {{text-transform : "uppercase"} }
      />
      <div className="add-ticker-button">
        <Button
          color="SeaGreen"
          text="Add ticker to watchlist"
          onClick={() => AddItem(searchInput)}
        />
      </div>

      {searchResult.length > 0
        ? searchResult.map((result) => (
            <table>
              <tr>
                <td>
                  <b>{result["1. symbol"]}</b>
                </td>
                <td>{result["2. name"]}</td>
                <td>{result["3. type"]}</td>
                <td>{result["4. region"]}</td>
              </tr>
            </table>
          ))
        : ""}

      <br></br>
    </div>
  );
};

export default SearchBar;

//OnClick ={AddItem(result["1. symbol"])}
