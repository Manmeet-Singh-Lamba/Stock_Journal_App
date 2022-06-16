import React from 'react'
//import {useNavigate} from 'react-router-dom'

const Logout = ({setUser_token}) => {

  

  return (
    <div>
      <h2>You are logged out</h2>
      Login <a href="/login" >here</a>
    </div>
  )
}

export default Logout

// const navigateAfterLogout = useNavigate() 

// {sessionStorage.removeItem("user_token")}
// {navigateAfterLogout("/login")}
// {setUser_token(sessionStorage.removeItem("user_token"))}