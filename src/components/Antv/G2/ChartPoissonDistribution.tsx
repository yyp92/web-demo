import React from 'react'
import { Chart } from '@antv/g2';
import {randomPoisson} from 'd3-random'
 
export const ChartPoissonDistribution = () => {
    const random = randomPoisson(Math.pow(10, 2.6))

    React.useEffect(() => {
        const chart = new Chart({
            container: 'container',
            theme: 'classic',
            autoFit: true
        })

        chart
            .rect()
            .data(new Array(5000).fill(0).map(random))
            .encode('x', (d: any) => d)
            .transform({type: 'binX', y: 'count'})
            .style('stroke', 'white')
            .style('fill', 'steelblue')

        chart.render()
    }, [])

    return (
        <>
            <h2>概率分布 - 泊松分布</h2>
            <div id="container" style={{
                marginTop: '30px',
                height: '500px',
            }}></div>
        </>
    )
}
