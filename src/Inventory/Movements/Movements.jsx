import React, { useState, useEffect } from "react";
import { useParams  } from 'react-router-dom';
import { getInventoryById } from '../../requestInventory';
import "./Movements.css";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function Movements(props) {
  const [form] = Form.useForm();
  const {inventoryId} = useParams();
  const [image, setImage] = useState('');
  const [movement, setMovement] = useState({});
  
  useEffect(() => {
    async function init() {
      const { id, idproducto: productId, productos: { nombre: name, imagen: image }, existencias: stock} = await getInventoryById(inventoryId);
      form.setFieldsValue({ productId, name, stock });
      setImage(image);
      setMovement({ id, productId, name, image })
    }
    init()
  }, []);
  
  
  const validateMessages = {
    required: "${label} es requerido!",
    types: {
      number: "${label} no es una cantidad válida!",
    },
    number: {
      range: "${label} debe estar entre ${min} y ${max}",
    },
  };

  const handleOnFinish = (product) => {};
  
  return (
    <div className="w-100 mt-10 display-flex-row  movements">
      <div className="movements_container">
        <h2 className="movements_title--center">Modificar inventario</h2>
        <div className="movements_form">
          <div className="w-100 mb-10 display-flex-row movements_image--header">
            <img src={ image || '/assets/fruitNotFound.jpg' } alt="" />
          </div>
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={handleOnFinish}
            validateMessages={validateMessages}
            autoComplete="off"
          >
            <Form.Item label="Código producto" name="productId">
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item label="Nombre" name="name">
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item
              label="Existencias"
              name="stock"
              rules={[
                {
                  required: true,
                  type: "number",
                  min: 1,
                  max: 1000,
                },
              ]}
            >
              <InputNumber placeholder="1" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Aceptar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Movements;
