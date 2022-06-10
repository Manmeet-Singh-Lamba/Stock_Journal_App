import Header from './components/Header'
import Button from './components/Button'
import Notes from './components/Notes'
import AddNote from './components/AddNote'
import React, { useState, useEffect } from 'react'

import './index.css'


const App = ()=> {
  const ticker = 'AMZN'

  const [notes, setNotes] = useState([
      {
          id : 1,
          stock_price : '242.13',
          stock_symbol : 'AMZN',
          price_date : 'Jan 7th at 1:00pm',
          date_posted : 'Feb 5th at 1:00pm',
          rating : 'Buy',    
          reason : 'growth ahead',
          
      },
      {
          id : 3,
          stock_price : '300.13',
          stock_symbol : 'AMZN',
          price_date : 'Jun 9th at 12:00pm',
          date_posted : 'Jul 5th at 1:30pm',
          rating : 'Buy',    
          reason : 'major accusitions increasing the earnings next quarter',
          
      },
      {
          id : 4,
          stock_price : '602.53',
          stock_symbol : 'AMZN',
          price_date : 'Sept 11th at 11:00am',
          date_posted : 'Sept 12th at 2:00pm',
          rating : 'Sell',    
          reason : 'overvalued, too high p/e',
          
      },
      {
          id : 9,
          stock_price : '142.06',
          stock_symbol : 'AMZN',
          price_date : 'Dec 7th at 8:00am',
          date_posted : 'Dec 25th at 2:00pm',
          rating : 'Sell',    
          reason : 'lack of demand',
          
      },
      ])
  useEffect(() => {
    const fetchNotes = async() => {
      const res = await fetch('http://localhost:8000/tasks')
    
    const data = await res.json()

    console.log(data)
  }
  fetchNotes()
  }, 
  [])
  
  const [showAddNote, setshowAddNote] = useState(false)
  //Add Note
  const addNote = (note) => {
    const id = Math.floor(Math.random()*10000)+1
    const newNote = {id, ...note}
    setNotes([...notes, newNote])
  }

  //Delete Note
  const deleteNote = (id) => {
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
      
      
      <footer>

      </footer>
    </div>
  );
}

export default App;
