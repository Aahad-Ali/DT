import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';
const TaskPieChart = () => {
    const [state, setstate] = useState({
        series: [150, 50, 80],
        options: {
            colors: ["#EF6B3E", "#F8F8F8", "#231F20"],
            chart: {
                width: 380,
                type: 'donut',
            },
            dataLabels: {
                enabled: false
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: false
                    }
                }
            }],
            legend: {
                position: 'right',
                offsetY: 0,
                height: 230,
            }
        },
    })
    return (
      <>
        <ReactApexChart
          options={state.options}
          legend={false}
          series={state.series}
          type="donut"
          width={
            window.innerWidth <= 850
              ? 250
              : window.innerWidth <= 1024
              ? 200
              : window.innerWidth <= 1280
              ? 200
              : 300
          }
        />
      </>
    );
}

export default TaskPieChart
