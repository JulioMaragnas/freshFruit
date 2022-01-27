import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import "./Login.css";
import profileIcon from "../Assets/profileIcon.png";
import { login } from '../requestUser';


function Login(props) {
  const navigate = useNavigate();
  const onFinish = async (userInfo) => {
    const res = await login(userInfo);
    if(!res){
      message.warning('Usuario o clave no validos!');
      return
    }
    sessionStorage.setItem('token',res);
    navigate('/')
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <section className="w-100 h-100 display-flex-row login">
      <div className="login_container">
        <div className="w-100 display-flex-row login_image--center">
          <img src={profileIcon} alt="" />
        </div>
        <div className="w-100 mt-10 login_form">
          <Form
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Usuario"
              name="usuario"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: "Por favor ingresa tu usuario!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Clave"
              name="clave"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu clave!",
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
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}
export default Login;
