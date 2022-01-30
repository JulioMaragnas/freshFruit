import React from "react";
import "./UserRegister.css";
import { Form, Input, InputNumber, Button, message } from "antd";

function UserRegister() {
  const [form] = Form.useForm();
  return (
    <div className="w-100 mt-10 display-flex-row  user-register">
      <div className="w-100 user-register_container">
        <h2 className="user-register_title--center">Registrar nuevo usuario</h2>
        <div className="user-register_form">
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={null}
            validateMessages={null}
            autoComplete="off"
          >
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Nombre del producto" />
            </Form.Item>
            <Form.Item
              label="Descripción"
              name="descripcion"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Descripción del producto" />
            </Form.Item>
            <Form.Item
              label="Precio de venta"
              name="precio"
              rules={[
                {
                  required: true,
                  type: "number",
                  min: 100,
                  max: 99999,
                },
              ]}
            >
              <InputNumber placeholder="$0" />
            </Form.Item>
            <Form.Item
              label="Valor de producción unitario"
              name="valorproduccionunitario"
              rules={[
                {
                  required: true,
                  type: "number",
                  min: 100,
                  max: 99999,
                },
              ]}
            >
              <InputNumber placeholder="$0" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Registrar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default UserRegister;

