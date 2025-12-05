import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRouter from './router/AppRouter'
import Navbar from './components/Navbar'
import './App.css'
import { fetchGetMe, checkIsAuth } from './redux/slices/authSlice'

function App() {
  const dispatch = useDispatch()

  // const isAuth = useSelector(checkIsAuth)


  useEffect(() => {
    dispatch(fetchGetMe())
  }, [])

  // if (!isAuth) return null
  return (
    <div className="app-container">
      <Navbar />
      <AppRouter />
      <Toaster position="bottom-center" />
    </div>
  )
}

export default App
