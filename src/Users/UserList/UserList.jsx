import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Table } from "antd";
import { getUserList } from '../../requestUser';

function UserList() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    async function init() {

      const res = await getUserList();

      const dataSource = res.map(user => (
        {
          ...user, 
          rol: user.roles.descripcion
        }))
        setUserList(dataSource);
    }
    init();
  }, []);

  const columns = [
    {
      title: "Nombre usuario",
      dataIndex: "nombreusuario",
      key: "nombreusuario",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Correo",
      dataIndex: "correoelectronico",
      key: "correoelectronico",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion"
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol"
    }
  ];
  
  return (
    <div className="w-100">
      <Table columns={columns} dataSource={userList} />
    </div>
  );
}

export default UserList;

