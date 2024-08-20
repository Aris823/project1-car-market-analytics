// src/Components/StackedBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StackedBarChart = ({ data }) => {
    
  const labels = Array.from(new Set(data.map(car => car.Model)));
  const carBrands = Array.from(new Set(data.map(car => car.NameMMT.split(' ')[0])));

  const datasets = carBrands.map(brand => {
    return {
      label: brand,
      data: labels.map(label => {
  //    const car = data.find(car => car.Model === label && car.NameMMT.startsWith(brand));
        const car = data.find(car => car.NameMMT.startsWith(brand));

        return car ? parseInt(car.PageViews) : 0;
      }),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    };
  });

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
      legend: {
        position: 'top',
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
