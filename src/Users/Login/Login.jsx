import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import "./Login.css";
import profileIcon from "../../Assets/profileIcon.png";
import { login, getUserInfo } from '../../requestUser';
import TermsAndConditions from '../TermsAndConditions/TermsAndConditionsModal';
import { CartContext } from '../../PerformaceHooks/useCart';
;


function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [cart, setCart] = useContext(CartContext);
  
  const onFinish = async (userInfo) => {
    const res = await login(userInfo);
    if(!res) {
      form.setFieldsValue({});
      return
    };
    const {roles: { codigo }} = await getUserInfo();
    codigo === 'CLIENTE' && navigate('/')
    codigo === 'ADMIN' && navigate('../manageOrders')
    codigo === 'REPARTIDOR' && navigate('../manageOrdersDelivery/listOrders')
    setCart({...cart, logged: true, role: codigo })
    
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
            form={form}
            layout="vertical"
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
                  //type: 'email',
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
        <div className="login_register">
          <a onClick={()=> navigate('../registerClient/0')}> Registrate! </a> <p />
          <a onClick={()=> setVisible(true)}> Leer T&eacute;rminos y condiciones </a>
        </div>
      </div>
      <TermsAndConditions visible={visible} setVisible={setVisible}></TermsAndConditions>
    </section>
  );
}
export default Login;
