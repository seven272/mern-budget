import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../utils/axios'

const fetchRegisterUser = createAsyncThunk(
  'auth/fetchRegisterUser',
  async ({ username, password }) => {
    
    try {
      const res = await axiosInstance.post('/auth/register', {
        username,
        password,
      })

      toast.success('Вы успешно зарегистрировались')
      return res.data
    } catch (error) {
      toast.error('Ошибка при регистрации')
      console.log(error)
    }
  }
)

const fetchLoginUser = createAsyncThunk(
  'auth/fetchLoginUser',
  async ({ username, password }) => {
    try {
      const res = await axiosInstance.post('/auth/login', {
        username,
        password,
      })

      toast.success('Вы успешно вошли в систему')
      return res.data
    } catch (error) {
      console.log(error)
      toast.error('Ошибка при авторизации')
    }
  }
)

const fetchLogoutUser = createAsyncThunk(
  'auth/fetchLogoutUser',
  async (_, { dispatch }) => {
    try {
      const res = await axiosInstance.post('/auth/logout')
      dispatch(logout)
      toast.success('Вы покинули сайт')
      return res.data
    } catch (error) {
      console.log(error)
      toast.error('Ошибка при выходе из системы')
    }
  }
)

const fetchGetMe = createAsyncThunk('auth/fetchGetMe', async () => {
  try {
    const res = await axiosInstance.get('/auth/me')
    return res.data
  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  isLoading: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    //register user
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.newUser
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
      })
    //login user
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload?.user
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
      })

    //logout user
    builder
      .addCase(fetchLogoutUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
      })
      .addCase(fetchLogoutUser.rejected, (state) => {
        state.isLoading = false
      })
    //get me
    builder
      .addCase(fetchGetMe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGetMe.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload?.user
      })
      .addCase(fetchGetMe.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
  },
})
const checkIsAuth = (state) => Boolean(state.auth.user)
export const { logout } = authSlice.actions
export {
  fetchRegisterUser,
  fetchLoginUser,
  fetchGetMe,
  fetchLogoutUser,
  checkIsAuth,
}
export default authSlice.reducer
