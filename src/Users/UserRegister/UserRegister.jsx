import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UserRegister.css";
import { Form, Input, Button, Checkbox, Select, message } from "antd";
import { createNewClient, createNewUser, getUserInfo } from "../../requestUser";

const { Option } = Select;
function UserRegister() {
  const { isAdminCreator } = useParams();
  const navigation = useNavigate();
  const [form] = Form.useForm();
  const [registerType, setRegisterType] = useState(3);
  
  useEffect(() => {
    async function init(){
      const res = await getUserInfo()
      form.setFieldsValue(res);
    }
    isAdminCreator == 0 && init();
  }, []);
  
  
  const handleSelectRol = (idRol)=> setRegisterType(idRol);
  const registerUser = async (user) => {
    debugger
    const { terminos } = user;
    if (isAdminCreator == 0 && !terminos) {
      message.info("Para registrarte debes aceptar términos y condiciones");
      return;
    }
    const { correoelectronico } = user;
    const [nombreusuario] = correoelectronico.split("@");
    const newUser = {
      ...user,
      nombreusuario,
      idestado: 1,
      idrol: registerType,
    };
    if (isAdminCreator == 0) {
      const res = await createNewClient(newUser);
      res && message.success("El registro se ha creado exitosamente, el administrador se pondrá en contacto para validar el registro",4);
      res && navigation("../login");
    }
    
    if (isAdminCreator != 0) {
      const res = await createNewUser(newUser, registerType);
      res && message.success("El registro se ha creado exitosamente", 2);
      res && navigation("pendingApprovals");
    }
  };
  return (
    <div className="w-100 mt-10 display-flex-row  user-register">
      <div className="w-100 user-register_container">
        <h2 className="user-register_title--center">Registrar nuevo usuario</h2>
        <div className="user-register_form">
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={registerUser}
            autoComplete="off"
            initialValues={{
              terminos: true,
            }}
          >
            <Form.Item
              key="nombreUsuario"
              label="Nombre"
              name="nombre"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu nombre!",
                },
              ]}
            >
              <Input placeholder="Tu nombre completo" />
            </Form.Item>
            {isAdminCreator != 1 && (
              <Form.Item
                key="nombreTienda"
                label="Nombre de la tienda"
                name="nombretienda"
              >
                <Input placeholder="Tu nombre de la tienda" />
              </Form.Item>
            )}
            <Form.Item
              key="celular"
              label="Número celular"
              name="celular"
              rules={[
                {
                  required: true,
                  pattern: /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/,
                  message: "Por favor ingresa tu numero celular valido!",
                },
              ]}
            >
              <Input placeholder="Tu número de celular" />
            </Form.Item>
            <Form.Item
              key="direccion"
              label="Dirección de envío"
              name="direccion"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu dirección!",
                },
              ]}
            >
              <Input placeholder="Tu dirección" />
            </Form.Item>
            <Form.Item
              key="email"
              label="Correo eletrónico"
              name="correoelectronico"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Por favor ingresa tu correo!",
                },
              ]}
            >
              <Input placeholder="correo eletrónico" />
            </Form.Item>
            <Form.Item
              key="clave"
              label="Clave"
              name="clave"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu correo!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            {isAdminCreator == 1 && (
              <Form.Item key="registerType" label="Rol" name="registerType">
                <Select
                  style={{ width: "100%" }}
                  placeholder="Selecciona un rol"
                  onChange={handleSelectRol}
                >
                  <Option key="ADMIN" value={1}>
                    Administrador
                  </Option>
                  <Option key="REPARTIDOR" value={2}>
                    Repartidor
                  </Option>
                </Select>
              </Form.Item>
            )}
            {isAdminCreator != 1 && (
              <Form.Item name="terminos" valuePropName="checked">
                <Checkbox>Acepto t&eacute;rminos y condiciones</Checkbox>
              </Form.Item>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Registrar mi información
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default UserRegister;

// onChange={handleSelectDeliver}
