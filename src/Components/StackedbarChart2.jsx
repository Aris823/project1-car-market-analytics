// src/Components/StackedBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend , Title, SubTitle} from 'chart.js';
import chroma from 'chroma-js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);


const StackedBarChart = ({ data }) => {
  const baseColor = "#FF5700"; // Orange color from TaladRod logo

  const brandModelMap = data.reduce((acc, car) => {
    const brand = car.NameMMT.split(' ')[0];
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

  const sortedBrands = Object.keys(brandModelMap)
    .map(brand => ({
      brand,
      total: Object.values(brandModelMap[brand]).reduce((sum, count) => sum + count, 0),
    }))
    .sort((a, b) => b.total - a.total)
    .map(item => item.brand);

  const allModels = Object.values(brandModelMap).flatMap(models => Object.keys(models));
  const sortedModelNames = Array.from(new Set(allModels))
    .sort((a, b) => {
      const aCount = sortedBrands.reduce((sum, brand) => sum + (brandModelMap[brand][a] || 0), 0);
      const bCount = sortedBrands.reduce((sum, brand) => sum + (brandModelMap[brand][b] || 0), 0);
      return bCount - aCount;
    });

  const datasets = sortedModelNames.map((model, index) => {
    const colorShades = chroma.scale([chroma(baseColor).darken(0), chroma(baseColor).brighten(3)])
                              .mode('lab')
                              .colors(sortedModelNames.length);

    return {
      label: model,
      data: sortedBrands.map(brand => brandModelMap[brand][model] || 0),
      barThickness: 20,
      categoryPercentage: 1,
      backgroundColor: colorShades[index],
      borderColor: chroma(colorShades[index]).darken(0.8).hex(),
      borderWidth: 1,
    };
  });

  const chartData = {
    labels: sortedBrands,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        align: "start",
        labels: {
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
      title: {
        display: true,
        text: 'Car Model Distribution Across Brands',
        font: {
          size: 16
        },
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
        },
        title: {
          display: true,
          text: 'Number of Cars', 
          font: {
            size: 16
          }
        }
      },
      y: {
        stacked: true,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0
        },
        title: {
          display: true,
          text: 'Car Brand',
          font: {
            size: 16
          }
        }
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StackedBarChart;

