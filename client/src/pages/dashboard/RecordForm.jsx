import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCreateRecord } from '../../redux/slices/recordsSlice'
import { checkIsAuth } from '../../redux/slices/authSlice'

const RecordForm = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const newRecord = {
      date: new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, ''),
      description: description,
      amount: parseFloat(amount), //преобразую строку в число
      category: category,
      paymentMethod: paymentMethod,
    }

    console.log(newRecord)

    dispatch(fetchCreateRecord(newRecord))

    setDescription('')
    setAmount('')
    setCategory('')
    setPaymentMethod('')
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Описание:</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Сумма:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(evt) => setAmount(evt.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Категория:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(evt) => setCategory(evt.target.value)}
          >
            <option value="">Выбор категории</option>
            <option value="Еда">Еда</option>
            <option value="Аренда">Аренда</option>
            <option value="Зарплата">Зарплата</option>
            <option value="Коммунальные услуги">
              Коммунальные услуги
            </option>
            <option value="Развлечения">Развлечения</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
        <div className="form-field">
          <label>Способ оплаты:</label>
          <select
            required
            className="input"
            value={paymentMethod}
            onChange={(evt) => setPaymentMethod(evt.target.value)}
          >
            <option value="">Выбор способа оплаты</option>
            <option value="Кредитная карта">Кредитная карта</option>
            <option value="Наличные">Наличные</option>
            <option value="Банковский перевод">
              Банковский перевод
            </option>
          </select>
        </div>
        <button type="submit" className="button" disabled={!isAuth}>
          Добавить Запись
        </button>
      </form>
    </div>
  )
}

export default RecordForm
