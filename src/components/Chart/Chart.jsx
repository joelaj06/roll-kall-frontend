import React from 'react';
import './chart.css';
import { ResponsiveContainer, Legend,LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


const Chart = ({chartTitle, data, xDataKey, yDataKey, strokeColor}) => {
 
    return (
        <div className='chart-container'>
            <div className="chart-title">
                <h6>{chartTitle}</h6>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xDataKey} />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey={yDataKey} stroke={strokeColor} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart