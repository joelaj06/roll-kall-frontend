import React from "react";
import "./chart.css";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { convertToHM } from "../../utils/date_formatter";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
  //   Legend
);

const Chart = ({
  chartTitle,
  labels,
  dataY,
  borderColor,
  isTime = false,
  showCard = true,
  showXGrid = true,
  toolTipLabel,
}) => {
  const reverseTheLabels = (labels) => {
    if (labels) return [...labels].reverse();
  };
  const reverseTheData = (dataY) => {
    if (dataY) return [...dataY].reverse();
  };
  const reversedLabels = reverseTheLabels(labels);
  const reversedDataY = reverseTheData(dataY);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
        font: {
          family: "Montserrat",
          size: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function(data) {
            let y = data.parsed.y || 0;
            let actualTime;
            const convertedTime = convertToHM(data.parsed.y);
            const hour = convertedTime.split(":")[0];
            if (parseInt(hour) < 12) {
              actualTime = convertedTime + "AM";
            } else {
              actualTime = convertedTime + "PM";
            }
            return isTime ? actualTime : y;
            
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value, index, ticks) {
            return isTime ? convertToHM(value) : value;
          },
          font: {
            family: "Montserrat",
            size: 12,
          },
        },
      },
      x: {
        grid: {
          drawOnChartArea: showXGrid,
        },
        ticks: {
          font: {
            family: "Montserrat",
            size: 12,
          },
        },
      },
    },
  };

  const data = {
    labels: reversedLabels,
    datasets: [
      {
        data: reversedDataY,
        borderColor: borderColor,
        backgroundColor: "white",
        pointBorderColor: "grey",
        pointBorderWidth: 2,
        borderJointStyle: "round",
        tension: isTime ? 0 : 0.4,
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className={showCard ? "chart-container" : ""}>
      <div className="chart">
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
};

export default Chart;
