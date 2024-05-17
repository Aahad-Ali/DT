import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
    {
        name: 'Jan',
        price: 11000,
    },
    {
        name: 'Feb',
        price: 14000,
    },
    {
        name: 'Mar',
        price: 18000,
    },
    {
        name: 'Apr',
        price: 23240.00,
    },
    {
        name: 'May',
        price: 16000,
    },
];
const TenantDashboardBarChart = () => {

    return (
        <>
            <BarChart
                width={window.innerWidth <= 850 ? 180 : 500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <Tooltip formatter={(value, name, props) => [`$ ${value.toLocaleString()}`]} itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "600" }} wrapperClassName='bar-chart-tooltip' cursor={false} />
                <Bar radius={[50, 50, 0, 0]} dataKey="price" fill="#98A2B3" activeBar={<Rectangle fill="#231F20" stroke="#231F20" />} />
            </BarChart>
        </>
    )
}

export default TenantDashboardBarChart
