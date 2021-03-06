import React, { useState, useEffect } from 'react';
import { Line, Bar, Charts} from 'react-chartjs-2';
import { fetchDailyData } from '../../api';
import { Charts as ChartJS } from 'chart.js/auto'

import styles from './Chart.module.css';



const Chart = ({data: {confirmed, recovered, deaths}, country}) =>{
    const [dailyData, setDailyData] = useState({});


    useEffect(() =>{
        const fetchApi = async () =>{
/*             const dailyData = await fetchDailyData();
 */            setDailyData(await fetchDailyData());
        }

        //console.log(dailyData);
        fetchApi();
    }, []);


    const LineChart =(
        dailyData.length
        ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                {
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0 0, .5)',
                    fill: true,
                }],
            }}
        />) : null
    );

    console.log(confirmed, recovered, deaths);

    const barChart = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label:  'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],

                            data: [confirmed.value, recovered.value, deaths.value],
                    },
                    ],
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current state in ${country}`},
                }}
            />
        ) : null
    );

    return(
        <div className={styles.container}>
            {country ? barChart : LineChart }
        </div>
    )
}

export default Chart;