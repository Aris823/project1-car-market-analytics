// src/Components/StackedBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend , Title, SubTitle} from 'chart.js';
import chroma from 'chroma-js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);


const StackedBarChart = ({ data }) => {

  data = data.filter(car => !car.IsCExp)

  const baseColor = "#094D8C"; 

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

  const distinctColors = chroma.scale('paired').mode('lab').colors(new Set(data.map(car => car.Model)).size);

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
backgroundColor: distinctColors[index % distinctColors.length],
    borderColor: chroma(distinctColors[index % distinctColors.length]).darken(1.5).hex(),
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
        display: true,
        position: 'top',
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
          autoSkip: false
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

