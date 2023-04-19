import React from 'react'
import { Chart } from '@antv/g2';
import {randomBinomial} from 'd3-random'
 
export const ChartBinomialDistribution = () => {

    React.useEffect(() => {
        const random = (randomBinomial as any)(1, 0.5)

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
            .axis('y', {labelFormatter: '~s'})
            .style('stroke', 'white')
            .style('fill', 'steelblue')

        chart.render()
    }, [])

    return (
        <>
            <h2>概率分布 - 二项分布</h2>
            <div id="container" style={{
                marginTop: '30px',
                height: '500px',
            }}></div>
        </>
    )
}
