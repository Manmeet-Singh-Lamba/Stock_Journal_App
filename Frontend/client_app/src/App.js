import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Home from './components/Home'
import Logout from './components/Logout'
import NoteDisplay from './components/NoteDisplay'
import ErrorPage from './components/ErrorPage'
import Login from './components/Login'
import SignUp from './components/SignUp'
//import SignUpForm from './components/auth/SignUpForm';
import React, { useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'


import './index.css'


const App = ()=> {
  const [user_token, setUser_token] = useState(sessionStorage.getItem("user_token"))
  
  window.scrollTo({
    top: 0,
    left: 0,
  });
  //const onAddClick= () => setshowAddNote(!showAddNote)

  // useEffect(()=>{
  //   console.log(`App useEffect executed ${user_token}`)
  // }, [user_token])


  const catchUser_token =  (token) => {
    setUser_token(token)
    console.log(`App rendered ${sessionStorage.getItem("user_token")}`)
  }
   

   
  return (
    <Router>
      {/* <div id="utoken">{user_token}</div> */}
      
      <div className="container">
        <nav>
          <Link to="/home"> Home </Link>
          {user_token && user_token!== '' ? <a href="/Logout" onClick={() => {setUser_token(sessionStorage.removeItem("user_token"))}}> Logout </a> :<></> }
        </nav>
        
        <header className="App-header">
          <h1>
              <Header title='Stock Journal' />
          </h1>
        </header>
        
        <Routes>
          <Route path = '/' element = {user_token && user_token!== '' ? <Home user_token={user_token} />: <Login catchUser_token = {catchUser_token}/>} />
          <Route path = '/home' element = {user_token && user_token!== '' ? <Home user_token={user_token} />: <Login catchUser_token = {catchUser_token}/>} />
          <Route path ='/Login' element = {<Login catchUser_token = {catchUser_token} />} />
          <Route path ='/SignUp' element = {<SignUp />} />
          <Route path = '/notes/:ticker_symbol' element = {user_token && user_token!== ''? <NoteDisplay user_token = {user_token}/>: <Login catchUser_token = {catchUser_token}/>}/>
          <Route path = '/about' element = {user_token && user_token!== ''?  <About />: <Login catchUser_token = {catchUser_token}/>} />
          <Route path = '/Logout' element = {<Logout  />} />
          <Route path = '*' element = {<ErrorPage />} />
        </Routes>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;

//setUser_token = {(token)=>setUser_token(token)}

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
