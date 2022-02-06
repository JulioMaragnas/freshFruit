import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GoalsList.css";
import { Table } from "antd";
import {  PlusOutlined} from "@ant-design/icons";
import { getGoals } from "../../requestMasters";

function GoalsList(params) {
  const [goalsList, setGoalsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const res = await getGoals();
      const dataSource = res.map((goal) => ({
        ...goal,
        productDescription: `${goal.productos.nombre} - ${goal.productos.descripcion}`,
      }));
      setGoalsList(dataSource);
    }
    init();
  }, []);

  const handleCreateGoal = () => {
    navigate(`../goalDetail`);
  };
  
  const columns = [
    {
      title: "C\xF3digo meta",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Fecha Inicio",
      dataIndex: "fechainicio",
      key: "fechainicio",
    },
    {
      title: "Fecha Fin",
      dataIndex: "fechafin",
      key: "fechafin",
    },
    {
      title: "Valor bono",
      dataIndex: "valorbono",
      key: "valorbono",
      render: (text, record) => `$${text}`,
    },
    {
      title: "Producto",
      dataIndex: "productDescription",
      key: "productDescription",
    },
  ];

  return (
    <div className="w-100">
      <div className="w-100 display-flex-row goals-list_button--create">
        <button
          onClick={() => handleCreateGoal(0)}
          className="container_button"
        >
          <PlusOutlined />
          <span> Crear meta </span>
        </button>
      </div>
      <Table columns={columns} dataSource={goalsList} />
    </div>
  );
}

export default GoalsList;
