import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getInventoryById,
  getListProducts,
  movementProduct,
} from "../../requestInventory";
import "./Movements.css";
import { Form, InputNumber, Button, Select, message } from "antd";
import { RollbackOutlined } from "@ant-design/icons";

function Movements(props) {
  const [form] = Form.useForm();
  const { inventoryId , add} = useParams();
  const [image, setImage] = useState("");
  const [movement, setMovement] = useState({});
  const [products, setProducts] = useState([]);
  const [originalQuantity, setOriginalQuantity] = useState(0);
  const { Option } = Select;

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const { id, idproducto, productos, existencias } = await getInventoryById(
        inventoryId
      );
      const { nombre, imagen } = productos || {};
      const res = await getListProducts();
      setOriginalQuantity(existencias);
      setMovement({ id, idproducto, nombre, imagen, existencias });
      form.setFieldsValue({ idproducto, existencias });
      setImage(imagen);
      setProducts(res);
    }
    init();
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

  const handleOnFinish = async ({ idproducto, existencias }) => {
    if(add == 0 && existencias > originalQuantity){
      message.warning(`La cantidad de existencias a disminuir debe ser menor a ${originalQuantity} unidades`);
      return;
    }
    let payload = {
      idproducto,
      existencias,
      idMotivo: 1,
    };
    if (inventoryId != 0) {
      payload.id = inventoryId;
    }
    const res = await movementProduct(payload);
    message.success("Se ha registrado el movimiento exitosamente");
    navigate(`../inventory`)
  };

  const handleSelectChange = (idProduct) => {
    const { imagen } = products.find((p) => p.id === idProduct);
    setImage(imagen);
  };

  return (
    <div className="w-100 mt-10 display-flex-row  movements">
      <Link to="../inventory">
        <button className="container_button">
          <RollbackOutlined />
          <span> volver a la lista </span>
        </button>
      </Link>
      <div className="movements_container">
        <h2 className="movements_title--center">
          {" "}
          {inventoryId != 0 ? "Agregar inventario" : "Crear inventario"}{" "}
        </h2>
        <div className="movements_form">
          <div className="w-100 mb-10 display-flex-row movements_image--header">
            <img src={image || "/assets/cancelIcon.png"} alt="" />
          </div>
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={handleOnFinish}
            validateMessages={validateMessages}
            autoComplete="off"
          >
            <Form.Item label="Producto" name="idproducto">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
                onChange={handleSelectChange}
                disabled={inventoryId != 0}
              >
                {products.map((p) => (
                  <Option key={p.id} value={p.id}>
                    {p.nombre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={inventoryId != 0 ? "Cantidad de existencias a adicionar" : "Cantidad de existencias a disminuir"}
              name="existencias" 
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
