import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import chartAnnotation from "chartjs-plugin-annotation";

// Register plugins
ChartJS.register(ArcElement, Tooltip, Legend, chartAnnotation);

const PieChart = ({ investmentStates, getInvestmentColor }) => {
  // 只画有两个及以上部分的饼图
  if (!investmentStates || investmentStates.length <= 1) return null;

  // 直接用 name 和 percent
  const labels = investmentStates.map(item => item.chineseName);
  const data = investmentStates.map(item => item.percent);

  const pieData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: labels.map(getInvestmentColor),
        hoverOffset: 4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
    },
  };

  return (
    <div className="mt-8 w-full">
      <p className="text-heading-3 text-neutral-100 mb-2 text-center">Portfolio Distribution</p>
      <Doughnut data={pieData} options={options} />
    </div>
  );
};

export default PieChart;
