import React from 'react'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const PolarChar = () => {
    const [state, setState] = useState({
        series: [42, 47, 52, 58, 65],
        options: {
            colors: ["#E6E9EF", "#FF5733", "#FFC300", "#33FF57", "#3374FF"],
            chart: {
                width: 380,
                type: 'polarArea'
            },
            labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
            fill: {

                opacity: 1
            },
            stroke: {
                width: 1,
                colors: undefined
            },
            yaxis: {
                show: false
            },
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeWidth: 0
                    },
                    spokes: {
                        strokeWidth: 0
                    },
                }
            },
            theme: {
                monochrome: {
                    enabled: true,
                    shadeTo: 'light',
                    shadeIntensity: 0.6
                }
            }
        },



    })
    return (
        <>
            <ReactApexChart options={state.options} series={state.series} type="polarArea" width={320} />
        </>
    )
}

export default PolarChar
