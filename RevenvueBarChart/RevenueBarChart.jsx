import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
const RevenueBarChart = () => {
    const [state, setState] = useState({
        series: [{
            data: [21, 22, 10, 28, 16, 21, 13, 30, 45]
        }],
        options: {
            colors: ["#EF6B3E"],
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                    distributed: true,
                    endingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                ],
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                    colorStops: [
                        {
                            offset: 0,
                            color: '#E9E9E9',
                            opacity: 1,
                        },
                        {
                            offset: 100,
                            color: '#D65225',
                            opacity: 1,
                        },
                    ],
                },
            },
        },
    })
    return (
        <>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />

        </>
    )
}

export default RevenueBarChart
