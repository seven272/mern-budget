import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'

import Login from './Login'
import Register from './Register'
// import { fetchGetMe } from '../../redux/slices/authSlice'

const Auth = () => {
  // const dispatch = useDispatch()
  const [showComponent, setShowComponent] = useState('login')


  return (
    <div>
      {showComponent === 'login' && (
        <Login showRegister={setShowComponent} />
      )}
      {showComponent === 'register' && (
        <Register showLogin={setShowComponent} />
      )}
    </div>
  )
}

export default Auth
