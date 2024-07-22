import React from 'react';
import { Button, Checkbox, Form, Input, message, } from 'antd';
import { PublicApi } from '../axiosInstance';


const Login = ({f}) =>{
    const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('Hello, Ant Design!');
  };
  const onFinishFailed = (errorInfo) => {
    messageApi.error('Could not login')
  };
    const onFinish = (values) => {
        PublicApi.post('/login/',values).then((res) => {
            console.info(res.status)
          if(res.status === 200) {
              console.log(f)
              localStorage.setItem('token',res.data.token)
              f(true)
            }else{
            messageApi.error('Could not login')
          }
        }).catch((error)=>{
            messageApi.error('Could not login')
        })
      };
    return(
        <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
         {contextHolder}
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
}
export default Login