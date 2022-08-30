import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import './LineGraph.css'
import Chart from 'chart.js/auto';



const buildChartData = (data, casesType) => {

  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      console.log(data['recovered'][date])
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType }) {
  const options = {
    plugins: {
      legend: {
          display: false
          
      }
  },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    responsive:true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: `No of ${casesType}`
        }
      }
    }
  
  };
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=20")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data)
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className="canvas">
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
                fill:true
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;