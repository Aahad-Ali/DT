import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PropertyBarChart = () => {
  const [state, setState] = useState({
    series: [
      {
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
    ],
    options: {
      colors: ["#E6E9EF", "#EF6B3E"],
      chart: {
        type: "bar",
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#000", "#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
    },
  });

  return (
    <>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={430}
      />
    </>
  );
};

export default PropertyBarChart;
