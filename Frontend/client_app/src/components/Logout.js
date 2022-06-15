import React from 'react'

const Logout = () => {
  return (
    <>{sessionStorage.removeItem("user_token")}</>
  )
}

export default Logout