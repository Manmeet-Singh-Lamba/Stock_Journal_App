import React, { useState, useEffect} from 'react'
import Header from './Header'
import Button from './Button'
import Notes from './Notes'
import AddNote from './AddNote'


const NoteDisplay = ({user_token}) => {
    const ticker_symbol = 'AMZN'
    const [notes, setNotes] = useState([])
    const [showAddNote, setshowAddNote] = useState(false)
    

    useEffect(() => {
        const getNotes = async () => {
          const notesFromServer = await fetchNotes()
          setNotes(notesFromServer)
        }
    
        getNotes()
      }, []) //dependency array

    //fetch Notes
    const fetchNotes = async() => {
    const response = await fetch(`http://localhost:5000/notes`, 
    { method: 'GET',
      headers: {'Content-type': 'application/json', "x-access-token":user_token}
    })
    const data = await response.json()

    if (response.status === 401){
    }

    return data
}


    //Add Note
    const addNote = async (note) => {
    console.log(note)
    const response = await fetch(`http://localhost:5000/addnote`, 
    { method: 'POST',
      headers: {'Content-type': 'application/json', "x-access-token": user_token},
      body: JSON.stringify(note)
    })

    const data = await response.json()
    setNotes([...notes, data])
  }

   //Delete Note
   const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/deletenote/${id}`, 
    { method: 'DELETE', 
      headers: {"x-access-token": user_token}
    })
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <main>
        <h3>
          <Header title={ticker_symbol} />
        </h3>

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

    )
}

export default NoteDisplay

