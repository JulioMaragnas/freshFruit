import React from "react";
import { Modal, Form, Select } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";

function ModalDeliver({isDeliversVisible, handleModalOk, handleModalCancel, handleSelectDeliver, delivers}) {
  const [form] = Form.useForm();
  const {Option} = Select;
  return (
    <Modal
      title="Esta orden va a pasar de estado, estás seguro?"
      icon= {<ExclamationCircleOutlined />}
      visible={isDeliversVisible}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      maskClosable={false}
    >
      <Form form={form}>
        <Select
          style={{ width: '100%' }}
          placeholder="Selecciona un repartidor"
          onChange={handleSelectDeliver}
        >
          {delivers.map((deliver) => (
            <Option key={deliver.id} value={deliver.id}>
              {deliver.nombre}
            </Option>
          ))}
        </Select>
      </Form>
    </Modal>
  );
}
export default ModalDeliver;

