import React, { useState, useEffect } from "react";
import Header from "./Header";
import Button from "./Button";
import Notes from "./Notes";
import AddNote from "./AddNote";
import StockChart from "./StockChart";
import { useNavigate, useParams } from "react-router-dom";


const NoteDisplay = ({ user_token }) => {
  const dataset = [
    { time: "24-Apr-07", value: 193.24 },
    { time: "25-Apr-07", value: 155.35 },
    { time: "26-Apr-07", value: 178.84 },
    { time: "27-Apr-07", value: 139.92 },
    { time: "30-Apr-07", value: 99.8 },
    { time: "1-May-07", value: 199.47 },
    { time: "24-Apr-07", value: 193.24 },
    { time: "25-Apr-07", value: 155.35 },
    { time: "26-Apr-07", value: 178.84 },
    { time: "27-Apr-07", value: 139.92 },
    { time: "30-Apr-07", value: 309.8 },
    { time: "1-May-07", value: 209.47 },
  ];

  const [data] = useState(dataset.map((data) => data["value"]));
  const { ticker_symbol } = useParams();
  const [notes, setNotes] = useState([]);
  const [showAddNote, setshowAddNote] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const getNotes = async () => {
      const notesFromServer = await fetchNotes();
      setNotes(notesFromServer);
    };

    getNotes();
  }, []); //dependency array

  //fetch Notes
  const fetchNotes = async () => {
    const response = await fetch(
      `http://localhost:5000/notes/${ticker_symbol}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-access-token": user_token,
        },
      }
    );

    if (response.status === 401) {
      sessionStorage.removeItem("user_token");
      navigate("/login");
    }
    const data = await response.json();

    return data;
  };

  //Add Note
  const addNote = async (note) => {
    console.log(note);
    const response = await fetch(`http://localhost:5000/addnote`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-access-token": user_token,
      },
      body: JSON.stringify(note),
    });

    if (response.status === 401) {
      sessionStorage.removeItem("user_token");
      navigate("/login");
    }

    const data = await response.json();
    setNotes([...notes, data]);
  };

  //Delete Note
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/deletenote/${id}`, {
      method: "DELETE",
      headers: { "x-access-token": user_token },
    });
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <main>
      <h3>
        <Header title={ticker_symbol} />
      </h3>

      <div className="chart">
        <StockChart 
        //style= {{display: "block", justify: "center", border: "10px"}}
        data={data} 
        ticker_symbol={ticker_symbol} />
      </div>

      <br />

      <div>
        <Button
          color={showAddNote ? "grey" : "teal"}
          text={showAddNote ? "Close" : "Add Note"}
          onClick={() => setshowAddNote(!showAddNote)}
        />

        {showAddNote && <AddNote onAdd={addNote} symbol = {ticker_symbol} />}
      </div>

      {notes.length > 0 ? (
        <Notes notes={notes} onDelete={deleteNote} />
      ) : (
        "No notes to show"
      )}
    </main>
  );
};

export default NoteDisplay;
