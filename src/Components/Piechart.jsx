import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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

const generateColorShades = (baseColor, count) => {

  return chroma.scale([chroma(baseColor).darken(0), chroma(baseColor).brighten(3)])
               .mode('lab')
               .colors(count);
};

const PieChart = ({ data }) => {
  data = data.filter(car => !car.IsCExp)

  const brandData = groupCarsByBrand(data);
  
  const sortedBrands = Object.entries(brandData).sort((a, b) => b[1] - a[1]);
  
  const labels = sortedBrands.map(([brand]) => brand);
  const values = sortedBrands.map(([, count]) => count);
  
  const colorCount = labels.length;
  const baseColor = "#094D8C"; 
  const colors = generateColorShades(baseColor, colorCount);

  const pieData = {
    labels: labels,
    datasets: [
      {
        Title: 'Total Number of Cars',
        label: 'Total Cars',
        data: values,
        backgroundColor: colors, 
        borderColor: colors.map(color => chroma(color).darken(0.8).hex()), 
        borderWidth: 1.5,
      },
    ],
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Car Availability by Brand',
        font: {
          size: 18
        },
      },
    },
  };

  return <Pie data={pieData} options={options} />

}

export default PieChart
