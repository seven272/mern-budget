/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Flex, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

import {
  fetchRegisterUser,
} from '../../redux/slices/authSlice'

const Register = ({ showLogin }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const onFinish = (values) => {
    dispatch(fetchRegisterUser(values))
    navigate('/')
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  
  return (
    <div className="page_form">
      <h3>Зарегистрироваться</h3>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 370 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center" vertical>
            <Button
              block={true}
              type="primary"
              htmlType="submit"
              size="medium"
            >
              Отправить
            </Button>
            <a onClick={() => showLogin('login')}>авторизация!</a>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
