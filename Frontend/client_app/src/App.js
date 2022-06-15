import Header from './components/Header'
import Button from './components/Button'
import Notes from './components/Notes'
import AddNote from './components/AddNote'
import Footer from './components/Footer'
import About from './components/About'
import Home from './components/Home'
import Logout from './components/Logout'
import ErrorPage from './components/ErrorPage'
//import Login from './components/Login'
import React, { useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom'


import './index.css'


const App = ()=> {
  const ticker_symbol = 'AMZN'
  const [user_token, setUser_token] = useState(sessionStorage.getItem("user_token"))
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
    const response = await fetch(`http://localhost:5000/notes`, 
    { method: 'GET',
      headers: {'Content-type': 'application/json', "x-access-token":user_token}
    })
    const data = await response.json()
    
    return data
  }

  const [showAddNote, setshowAddNote] = useState(false)

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
    // const id = Math.floor(Math.random()*10000)+1
    // const newNote = {id, ...note}
    // setNotes([...notes, newNote])
  }

  //Delete Note
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/deletenote/${id}`, 
    { method: 'DELETE', 
      headers: {"x-access-token": user_token}
    })
    setNotes(notes.filter((note) => note.id !== id))
  }

  //const onAddClick= () => setshowAddNote(!showAddNote)

  const Display = ()=> {
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

    );
  }

  const Login = ()=> {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigateAfterLogin = useNavigate() 

    const goLogin = async (username, password) => {
      const cred = `${username}:${password}`
      const info = btoa(cred)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Basic ${info}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      // const response = await fetch("http://127.0.0.1:5000/login", requestOptions)
      // const data = await response.json()
      // setUser_token(data["token"])
      // console.log(data["token"])
      // console.log(user_token)

      fetch("http://127.0.0.1:5000/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        setUser_token(result["token"])
        sessionStorage.setItem("user_token", result["token"])
      })
      .catch(error => console.log('error', error));
      navigateAfterLogin("/home")
    }

    const onSubmit = (e) => {
      e.preventDefault()

      if (!username || !password){
          alert('Please add all info')
          return
      }

      goLogin(username, password)

      setUsername('')
      setPassword('')    
  }
    return (
      <form onSubmit={onSubmit}>
        <div className='form-control'>
          <label>
              Username
          </label>
          <input type='text' 
                  placeholder='Enter your username' 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>
              Password
          </label>
          <input type='password' 
                  placeholder='Enter the password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type='submit' value='Login' className= 'btn btn-block' />
      </form>
    );
  }
  

  

  return (
    <Router>
      <div id="utoken">{user_token}</div>
      <div className="container">
        <nav>
          <Link to="/home"> Home </Link>
          <Link to="/"> Notes </Link>
          {user_token && user_token!== '' ? <a href="/Logout" > Logout </a> : <a href="/Login" > Login </a>}
        </nav>
        
        
        <header className="App-header">
          <h1>
              <Header title='Stock Journal' />
          </h1>
        </header>
        

        <Routes>
          <Route path = '/home' element = {user_token && user_token!== '' ? <Home user_token={user_token} />: <Login />} />
          <Route path ='/login' element = {<Login setUser_token = {setUser_token}/>} />
          <Route path = '/' element = {user_token && user_token!== ''? <Display />: <Login />}/>
          <Route path = '/about' element = {user_token && user_token!== ''?  <About />: <Login />} />
          <Route path = '/Logout' element = {<Logout />} />
          <Route path = '*' element = {<ErrorPage />} />
        </Routes>

        <Footer />

      </div>
    </Router>
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
