import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '../../utils/axios'

const fetchCreateRecord = createAsyncThunk(
  'records/fetchCreateRecord',
  async (record) => {
    try {
      const res = await axiosInstance.post('/', record)
      return res.data
    } catch (error) {
      console.log('ошибка при создании новой записи в redux ', error)
    }
  }
)

const fetchGetAllRecords = createAsyncThunk(
  'records/fetchGetAllRecords',
  async () => {
    try {
      const res = await axiosInstance.get(`/records`)
      return res.data
    } catch (error) {
      console.log('ошибка при получении списка всех записей в redux ', error)
    }
  }
)

const fetchUpdateRecord = createAsyncThunk(
  'records/fetchUpdateRecord',
  async ({idRecord, updatedRecord}) => {
    try {
      const res = await axiosInstance.put(`/${idRecord}`, updatedRecord)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log('ошибка при создании новой записи в redux ', error)
    }
  }
)

const fetchDeleteRecord = createAsyncThunk(
  'records/fetchDeleteRecord',
  async (idRecord) => {
    try {
      const res = await axiosInstance.delete(`/${idRecord}`)
      return res.data
    } catch (error) {
      console.log('ошибка при создании новой записи в redux ', error)
    }
  }
)

// Начальное значение
const initialState = {
  isLoading: false, 
  recordsList: [],
}

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    clearRecords: (state, action) => {
      state.recordsList = []
    },
  },
  extraReducers: (builder) => {
    builder
      //create record
      .addCase(fetchCreateRecord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCreateRecord.fulfilled, (state, action) => {
        state.isLoading = false
        state.recordsList.push(action.payload)
      })
      .addCase(fetchCreateRecord.rejected, (state) => {
        state.isLoading = false
      })
      //get all records
      .addCase(fetchGetAllRecords.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetAllRecords.fulfilled, (state, action) => {
        state.isLoading = false
        state.recordsList = action?.payload
      })
      .addCase(fetchGetAllRecords.rejected, (state) => {
        state.isLoading = false
        state.recordsList = []
      })
      //update record
      .addCase(fetchUpdateRecord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUpdateRecord.fulfilled, (state, action) => {
        const updatedRecord = action.payload
        state.isLoading = false
        state.recordsList = state.recordsList.map((elem) => {
          if (elem._id === updatedRecord._id) {
            return updatedRecord
          }
          return elem
        })
      })
      .addCase(fetchUpdateRecord.rejected, (state) => {
        state.isLoading = false
      })
      //delete record
      .addCase(fetchDeleteRecord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchDeleteRecord.fulfilled, (state, action) => {
        const deletedRecord = action.payload
        state.isLoading = false
        state.recordsList = state.recordsList.filter(
          (elem) => elem._id !== deletedRecord._id
        )
      })
      .addCase(fetchDeleteRecord.rejected, (state) => {
        state.isLoading = false
      })
  },
})

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { clearRecords } = recordsSlice.actions

export {
  fetchCreateRecord,
  fetchGetAllRecords,
  fetchUpdateRecord,
  fetchDeleteRecord,
}

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default recordsSlice.reducer
