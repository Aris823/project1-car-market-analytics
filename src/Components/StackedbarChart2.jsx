// src/Components/StackedBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StackedBarChart = ({ data }) => {
  // Group data by brand and model
  const brandModelMap = data.reduce((acc, car) => {
    const brand = car.NameMMT.split(' ')[0]; // Extract brand from NameMMT
    const model = car.Model;

    if (!acc[brand]) {
      acc[brand] = {};
    }

    if (acc[brand][model]) {
      acc[brand][model] += 1;
    } else {
      acc[brand][model] = 1;
    }

    return acc;
  }, {});

  const labels = Object.keys(brandModelMap); // Brand names
  const modelNames = Array.from(new Set(data.map(car => car.Model))); // Unique model names

  const datasets = modelNames.map(model => {
    return {
      label: model,
      data: labels.map(brand => brandModelMap[brand][model] || 0),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      borderWidth: 1,
    };
  });

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    indexAxis: 'y', 
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StackedBarChart;
