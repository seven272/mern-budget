import { useSelector } from 'react-redux'

import RecordForm from './RecordForm'
import RecordList from './RecordList'
import NoRecords from './NoRecords'
import { checkIsAuth } from '../../redux/slices/authSlice'
import './record.css'

const Dashboard = () => {
  const isAuth = useSelector(checkIsAuth)

  return (
    <div>
      <h2>Расходы и доходы</h2>
      <RecordForm />
      {!isAuth ? <NoRecords /> : <RecordList />}
    </div>
  )
}

export default Dashboard
