import Header from './components/Header'
import Button from './components/Button'
import Notes from './components/Notes'
import AddNote from './components/AddNote'
import React, { useState, useEffect } from 'react'

import './index.css'


const App = ()=> {
  const ticker = 'AMZN'

  const [notes, setNotes] = useState([])

  useEffect(() => {
    const getNotes = async () => {
      const notesFromServer = await fetchNotes()
      setNotes(notesFromServer)
    }

    getNotes()
  }, []) //dependency array
  
  //fetch Notes
  const fetchNotes = async() => {
    const response = await fetch('http://localhost:5000/notes/1')
    const data = await response.json()
    
    return data
  }

  const [showAddNote, setshowAddNote] = useState(false)

  //Add Note
  const addNote = async (note) => {
    console.log(note)
    const response = await fetch(`http://localhost:5000/addnote`, 
    { method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(note)
    })

    const data = await response.json()
    setNotes([...notes, data])
    // const id = Math.floor(Math.random()*10000)+1
    // const newNote = {id, ...note}
    // setNotes([...notes, newNote])
  }

  //Delete Note
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/deletenote/${id}`, {method: 'DELETE'})
    setNotes(notes.filter((note) => note.id !== id))
  }

  //const onAddClick= () => setshowAddNote(!showAddNote)

  return (
    <div className="container">
      <header className="App-header">
        <h1>
            <Header title='Stock Journal' />
        </h1>
      </header>

      <main>
        <h2>
          <Header title={ticker} />
        </h2>

        <div id="my_dataviz"></div>

        <div >
        <Button color={showAddNote ? 'grey': 'teal'} 
                text={showAddNote ? 'Close': 'Add Note'} 
                onClick={() => setshowAddNote(!showAddNote)} 
                />

        { showAddNote &&  <AddNote onAdd={addNote}/>
        }
        </div>


        { notes.length> 0 ? (<Notes notes = {notes} onDelete = {deleteNote}/>) : ('No notes to show') 
        }

      </main>
      

    </div>
  );
}

export default App;



// testdata = [
//   {
//       id : 1,
//       stock_price : '242.13',
//       stock_symbol : 'AMZN',
//       price_date : 'Jan 7 2022 1:00pm',
//       date_posted : 'Feb 5 2022 1:00pm',
//       rating : 'Buy',    
//       reason : 'growth ahead',
      
//   },
//   {
//       id : 3,
//       stock_price : '300.13',
//       stock_symbol : 'AMZN',
//       price_date : 'Jun 9th at 12:00pm',
//       date_posted : 'Jul 5th at 1:30pm',
//       rating : 'Buy',    
//       reason : 'major accusitions increasing the earnings next quarter',
      
//   },
//   {
//       id : 4,
//       stock_price : '602.53',
//       stock_symbol : 'AMZN',
//       price_date : 'Sept 11th at 11:00am',
//       date_posted : 'Sept 12th at 2:00pm',
//       rating : 'Sell',    
//       reason : 'overvalued, too high p/e',
      
//   },
//   {
//       id : 9,
//       stock_price : '142.06',
//       stock_symbol : 'AMZN',
//       price_date : 'Dec 7th at 8:00am',
//       date_posted : 'Dec 25th at 2:00pm',
//       rating : 'Sell',    
//       reason : 'lack of demand',
      
//   },]
