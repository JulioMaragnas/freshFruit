import React, {useEffect, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import format from 'format-number'
import "./ChartsContainer.css";
import { getDataForChart, getListInventory, calculatePurchaseByMonth } from '../requestInventory';

function ChartsContainer() {
  const [head, setHead] = useState({});
  const [purchaseByMonth, setPurchaseByMonth] = useState([[],[]]);
  const [fruitsMoreSold, setFruitsMoreSold] = useState([[],[],[]]);
  useEffect(()=>{
    // totalVentas: 0,
    // ventaMaxPedido: 0,
    // cantPulpasVendidas: 0,
    // totalRedenciones: 0,
    // devoluciones: 0,
    async function init(){
      const { encabezado, frutasMasVendida, ventasMes } = await getDataForChart();
      const inventory = await getListInventory();
      
      setHead(encabezado);
      
      const [purchaseByMonthLabels, purchaseByMonthValues] = calculatePurchaseByMonth(ventasMes);
      setPurchaseByMonth([purchaseByMonthLabels, purchaseByMonthValues])
    }
    init()
  }, [])

  var myFormat = format({ prefix: '$' });
  return (
    <section className="w-100 display-flex-row charts ant-row">
      <div className="w-100 mb-10 ant-col ant-col-xs-24 ant-col-lg-24 ant-col-xl-24">
        <div className="ant-row">
          <div className="charts_card shadow ant-col ant-col-xs-24 ant-col-lg-5 ant-col-xl-5">
            <h1>Total de ventas</h1>
            <p> {myFormat(head.totalVentas)} </p>
          </div>
          <div className="charts_card shadow ant-col ant-col-xs-24 ant-col-lg-5 ant-col-xl-5">
            <h1>Venta max por pedido</h1>
            <p> {myFormat(head.ventaMaxPedido)} </p>
          </div>
          <div className="charts_card shadow ant-col ant-col-xs-24 ant-col-lg-5 ant-col-xl-4">
            <h1>Pulpas vendidas</h1>
            <p> {head.cantPulpasVendidas} <span>und</span></p>
          </div>
          <div className="charts_card shadow ant-col ant-col-xs-24 ant-col-lg-4 ant-col-xl-4">
            <h1> Redenciones </h1>
            <p> {head.totalRedenciones} <span>vales</span></p>
          </div>
          <div className="charts_card shadow ant-col ant-col-xs-24 ant-col-lg-4 ant-col-xl-4">
            <h1>Devoluciones</h1>
            <p> {head.devoluciones} <span>pedidos</span></p>
          </div>
        </div>
      </div>
      <div className="charts_chart--double shadow ant-col ant-col-xs-24 ant-col-lg-24 ant-col-xl-11">
        <QuantiySalesByMonth />
      </div>
      <div className="shadow ant-col ant-col-xs-24 ant-col-lg-24 ant-col-xl-11">
        <InventoryByProducts />
      </div>
      <div className="charts_chart--single shadow ant-col ant-col-xs-24 ant-col-lg-24 ant-col-xl-23">
        
      </div>
    </section>
  );
}
//<PurchaseBarChart />
function PurchaseBarChart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Comparativo de ventas por mes de las frutas mas vendidas",
      },
    },
  };

  const labelsPurchases = ["Piña", "Manzana", "Pera", "Mora", "Mango", "Kiwi"];

  const data = {
    labels: labelsPurchases,
    datasets: [
      {
        label: "Ventas enero",
        data: labelsPurchases.map(() =>
          Math.floor(Math.random() * (200 - 0 + 1) + 0)
        ),
        backgroundColor: "#78FA9E",
      },
      {
        label: "Ventas febrero",
        data: labelsPurchases.map(() =>
          Math.floor(Math.random() * (200 - 0 + 1) + 0)
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

function QuantiySalesByMonth({purchaseByMonth}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ventas por mes",
      },
    },
  };

  const data = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

function InventoryByProducts() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cantidad de productos en inventario",
      },
    },
  };
  const data = {
    labels: ["Piña", "Manzana", "Pera", "Mora", "Mango", "Kiwi"],
    datasets: [
      {
        label: 'Cantidad en inventario',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} options={options}/>;
}

export default ChartsContainer;
