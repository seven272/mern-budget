import { Link } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'

import { fetchLogoutUser } from '../redux/slices/authSlice'
import { clearRecords } from '../redux/slices/recordsSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const logout = () => {
    const result = confirm('Вы уверены, что хотите выйти?')
    if (result) {
      console.log('Вы успешно вышли из системы')
      dispatch(fetchLogoutUser())
      dispatch(clearRecords())
    } else {
      console.log('Вы решили остаться')
    }
  }



  return (
    <div className="navbar">
      <div className="navbar_menu">
        <div className="navbar_link">
          <Link to="/">Бюджет </Link>
          <Link to="/auth">Авторизация</Link>
        </div>

        <div className="navbar_user">
          <UserOutlined className="navbar_user_icon" />
          {user?.username ? (
            <span className="navbar_user_name">{user.username}</span>
          ) : (
            <span className="navbar_user_name">unknown user</span>
          )}
        </div>
      </div>

      <LogoutOutlined
        style={{ fontSize: '30px', cursor: 'pointer' }}
        className="navbar_icon"
        onClick={logout}
      />
    </div>
  )
}

export default Navbar
