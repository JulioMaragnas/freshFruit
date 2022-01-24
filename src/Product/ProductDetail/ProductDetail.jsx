import React, { useState } from "react";
import { useParams  } from 'react-router-dom';
import "./ProductDetail.css";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function ProductDetail(props) {
  const [form] = Form.useForm();
  const {productId} = useParams();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const validateMessages = {
    required: "${label} es requerido!",
    types: {
      number: "${label} no es un precio válido!",
    },
    number: {
      range: "${label} debe estar entre ${min} y ${max}",
    },
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
    debugger;
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    debugger;
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };
  const handleOnFinish = (product) => {
    if (!imageUrl) {
      alert("Para crear el producto debes cargar la imagen de referencia");
      return;
    }
    
  };
  return (
    <div className="w-100 mt-10 display-flex-row  product-detail">
      <div className="w-100 product-detail_container">
        <h2 className="product-detail_title--center">{ `${productId !== 0 ? 'Modificar': 'Crear'} producto` }</h2>
        <div className="product-detail_form">
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={handleOnFinish}
            validateMessages={validateMessages}
            autoComplete="off"
          >
            <Form.Item
              label="Nombre"
              name="name"
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
              name="price"
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
              name="value"
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
            <Form.Item label="Imagen">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
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
export default ProductDetail;
