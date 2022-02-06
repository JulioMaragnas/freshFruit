import React, { useEffect, useState } from "react";
import {  Modal, Select } from "antd";

function ModalReturnReason({ isVisible, handleModal}) {

  const [reasonsList, setReasonsList] = useState([]);
  const [reason, setReason] = useState();
  const { Option } = Select;

  useEffect(()=>{
    const reasons = JSON.parse(sessionStorage.getItem('reasons')) || [];
   reasons.sort((a,b) => (a.descripcion > b.descripcion) ? 1 : ((b.descripcion > a.descripcion) ? -1 : 0));
    setReasonsList(reasons);
    
  },[])

  const handleSelectChange = (idReason) => {
    setReason(idReason);
  }
  
  
  return(
    <Modal
    title="Motivo de devolución"
    width={'40%'}
    visible={isVisible}
    onOk={()=> handleModal(reason)}
    onCancel={()=> handleModal(null)}
    maskClosable={false}
  >
    <div className="w-100">
    <Select
                
                style={{ width: "100%" }}
                placeholder="Motivos"
               
                onChange={handleSelectChange}
              >
                {reasonsList.map((p) => (
                  <Option key={p.id} value={p.id}>
                    {" "}
                    {p.descripcion}{" "}
                  </Option>
                ))}
              </Select>
      
    </div>
  </Modal>
  )
}
export default ModalReturnReason;
