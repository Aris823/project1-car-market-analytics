import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const groupCarsByBrand = (cars) => {
  const brandCounts = {};

  cars.forEach(car => {
    const brand = car.NameMMT.split(' ')[0]; 
    if (brandCounts[brand]) {
      brandCounts[brand] += 1;
    } else {
      brandCounts[brand] = 1;
    }
  });

  return brandCounts;
};

const PieChart = ({ data }) => {
  const brandData = groupCarsByBrand(data);

  const pieData = {
    labels: Object.keys(brandData),
    datasets: [
      {
        label: '# of Cars',
        data: Object.values(brandData),
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

  return <Pie data={pieData} />;
};

export default PieChart;

