import React from "react";
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

function ChartsContainer() {
  var myFormat = format({ prefix: '$' });
  return (
    <section className="w-100 display-flex-row charts">
      <div className="w-100 mb-10 display-flex-row charts_chart charts_chart--cards">
        <div className="charts_card shadow">
          <h1>Total de ventas</h1>
          <p> {myFormat(19850900)} </p>
        </div>
        <div className="charts_card shadow">
          <h1>Venta max por pedido</h1>
          <p> {myFormat(290750)} </p>
        </div>
        <div className="charts_card shadow">
          <h1>Pulpas vendidas</h1>
          <p> 1830 <span>und</span></p>
        </div>
        <div className="charts_card shadow">
          <h1> Redenciones </h1>
          <p> 50 <span>vales</span></p>
        </div>
        <div className="charts_card shadow">
          <h1>Devoluciones</h1>
          <p> 1830 <span>pedidos</span></p>
        </div>
      </div>
      <div className="charts_chart charts_chart--double shadow">
        <QuantiySalesByMonth />
      </div>
      <div className="charts_chart charts_chart--single shadow">
        <InventoryByProducts />
      </div>
      <div className="charts_chart charts_chart--double shadow">
        <PurchaseBarChart />
      </div>
    </section>
  );
}

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

function QuantiySalesByMonth() {
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

  const labels = ["Noviembre", "Diciembre", "Enero", "Febrero"];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: labels.map(() => Math.floor(Math.random() * (30 - 0 + 1) + 0)),
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
