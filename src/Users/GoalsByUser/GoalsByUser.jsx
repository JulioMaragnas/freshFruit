import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GoalsByUser.css";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  InputNumber,
  DatePicker,
} from "antd";
import { createGoal } from '../../requestMasters';
import { getListInventory } from '../../requestInventory';

const { Option } = Select;
function GoalsByUser() {
  const navigation = useNavigate();
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(0);

    useEffect(() => {
      async function init() {
          const res = await getListInventory()
          setProducts(res)
      }
      init()
    }, []);
    
  
  const handleSelectProduct = (idProduct) => setSelectedProduct(idProduct);
  const registerGoal = async (goal) => {
    const res = await createGoal(goal)
    res && navigation('../goals')
  };
  return (
    <div className="w-100 mt-10 display-flex-row  goal">
      <div className="w-100 goal_container">
        <h2 className="goal_title--center">
          Registrar nueva meta para usuarios
        </h2>
        <div className="goal_form">
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={registerGoal}
            autoComplete="off"
            initialValues={{
              terminos: true,
            }}
          >
            <Form.Item
              key="nombre"
              label="Nombre"
              name="nombre"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el nombre de la meta!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              key="descripcion"
              label="Descripcion de la meta"
              name="descripcion"
            >
              <Input />
            </Form.Item>
            <Form.Item
              key="cantidad"
              label="Cantidad objetivo"
              name="cantidad"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el valor de la cantidad!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              key="valorbono"
              label="Valor del bono"
              name="valorbono"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el valor del bono!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              key="fechainicio"
              label="Fecha inicio de la meta"
              name="fechainicio"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa la fecha!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              key="fechafin"
              label="Fecha fin de la meta"
              name="fechafin"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa la fecha!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              key="idproducto"
              label="Producto de la oferta"
              name="idproducto"
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Selecciona un producto"
                onChange={handleSelectProduct}
              >
                {products.map((p) => (
                  <Option key={p.productos.id} value={p.productos.id}>
                    { p.productos.nombre }
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Registrar meta
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default GoalsByUser;

// onChange={handleSelectDeliver}
