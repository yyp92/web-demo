/**
 * * react-spring
 * 
 * useSpringValue：指定单个属性的变化
 * useSpring：指定多个属性的变化
 * useSprings：指定多个元素的多个属性的变化，动画并行执行
 * useTrial：指定多个元素的多个属性的变化，动画依次执行
 * useSpringRef：用来拿到每个动画的 ref，可以用来控制动画的开始、暂停等
 * useChain：串行执行多个动画，每个动画可以指定不同的开始时间
 */
import {useEffect} from 'react'
import {
    useSpringValue,
    animated,
    useSpring,
    useSprings,
    useTrail,
    useChain,
    useSpringRef
} from '@react-spring/web'

import s from './index.module.scss'


const STROKE_WIDTH = 0.5
const MAX_WIDTH = 150
const MAX_HEIGHT = 100
// 笑脸位置
const COORDS = [
    [50, 30],
    [90, 30],
    [50, 50],
    [60, 60],
    [70, 60],
    [80, 60],
    [90, 50],
]

export const ReactSpringTest = () => {
    // 单个 style变化
    // const width = useSpringValue(
    //     0,
    //     {
    //         config: {
    //             // duration: 2000,

    //             // 质量（也就是重量），质量越大，回弹惯性越大，回弹的距离和次数越多
    //             mass: 2,

    //             // 摩擦力，增加点阻力可以抵消质量和张力的效果
    //             friction: 10,

    //             // 张力，弹簧松紧程度，弹簧越紧，回弹速度越快
    //             tension: 200
    //         }
    //     }
    // )
    
    // useEffect(() => {
    //     width.start(300)
    // }, [])



    // 多个 style 变化
    // const styles = useSpring({
    //     from: {
    //         width: 0,
    //         height: 0
    //     },
    //     to: {
    //         width: 200,
    //         height: 200
    //     },
    //     config: {
    //         // duration: 2000,
    //         mass: 2,
    //         friction: 10,
    //         tension: 400
    //     }
    // })



    // useSpring 还有另外一种传入函数的重载，这种重载会返回 [styles, api] 两个参数
    // const [styles, api] = useSpring(() => {
    //     return {
    //         from: {
    //             width: 100,
    //             height: 100
    //         },
    //         config: {
    //             // duration: 2000
    //             mass: 2,
    //             friction: 10,
    //             tension: 400
    //         }
    //     }
    // })
    
    // function clickHandler() {
    //     api.start({
    //         width: 200,
    //         height: 200
    //     })
    // }

    // return (
    //     <animated.div
    //         className={s.box}
    //         style={{ ...styles }}
    //         onClick={clickHandler}
    //     ></animated.div>
    // )






    /**
     * 多个元素都要同时做动画
     */
    // const [springs, api] = useSprings(
    //     3,
    //     () => ({
    //         from: { width: 0 },
    //         // to: { width: 300 },
    //         config: {
    //             duration: 1000
    //         }
    //     })
    // )

    // useEffect(() => {
    //     // 指定了 to，那会立刻执行动画，或者不指定 to，用 api.start 来开始动画
    //     api.start({ width: 300 });
    // }, [])

    // return (
    //     <div>
    //         {
    //             springs.map(styles => (
    //                 <animated.div
    //                     style={styles}
    //                     className={s.box}
    //                 ></animated.div>
    //             ))
    //         }
    //     </div>
    // )



    /**
     * 如果多个元素的动画是依次进行
     */
    // const [springs, api] = useTrail(
    //     3,
    //     () => ({
    //         from: { width: 0 },
    //         config: {
    //             duration: 1000
    //         }
    //     })
    // )
    
    // useEffect(() => {
    //     api.start({ width: 300 });
    // }, [])
    
    // return (
    //     <div>
    //         {
    //             springs.map(styles => (
    //                 <animated.div
    //                     style={styles}
    //                     className={s.box}
    //                 ></animated.div>
    //             ))
    //         }
    //     </div>
    // )




    /**
     * 多个动画如何安排顺序
     */
    // useSpringRef 拿到两个动画的 api
    // const api1 = useSpringRef()
    // const [springs] = useTrail(
    //     3,
    //     () => ({
    //         ref: api1,
    //         from: { width: 0 },
    //         to: { width: 300 },
    //         config: {
    //             duration: 1000
    //         }
    //     }),
    //     []
    // )

    // const api2 = useSpringRef()
    // const [springs2] = useSprings(
    //     3,
    //     () => ({
    //         ref: api2,
    //         from: { height: 100 },
    //         to: { height: 50},
    //         config: {
    //             duration: 1000
    //         }
    //     }),
    //     []
    // )

    // // 用 useChain 来安排两个动画的顺序
    // useChain(
    //     [api1, api2],
    //     [0, 1],
    //     500
    // )

    // return (
    //     <div>
    //         {
    //             springs.map((styles1, index) => (
    //                 <animated.div
    //                     style={{
    //                         ...styles1,
    //                         ...springs2[index]
    //                     }}
    //                     className={s.box}
    //                 ></animated.div>
    //             ))
    //         }
    //     </div>
    // )




    /**
     * 笑脸动画
     */
    // 用 useSpringRef 拿到动画引用时，需要手动调用 start 来开始动画
    const gridApi = useSpringRef()
    // 用 useTrail 来做从 0 到指定 width、height 的动画
    const gridSprings = useTrail(
        16,
        {
            ref: gridApi,
            from: {
                x2: 0,
                y2: 0,
            },
            to: {
                x2: MAX_WIDTH,
                y2: MAX_HEIGHT,
            },
        }
    )

    const boxApi = useSpringRef()
    const [boxSprings] = useSprings(
        7, 
        i => ({
            ref: boxApi,
            from: {
                scale: 0,
            },
            to: {
                scale: 1,
            },
            delay: i * 200,
            config: {
                mass: 2,
                tension: 220,
            },
        })
    )

    useChain([gridApi, boxApi], [0, 1], 1500)

    return (
        <div className={s.containerWraper}>
            <div className={s.container}>
                {/* 用 svg 的 line 来画线，设置 x1、y1、x2、y2 就是一条线 */}
                <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
                    <g>
                        {/* 竖线 */}
                        {
                            gridSprings.map(({ x2 }, index) => (
                                <animated.line
                                    x1={0}
                                    y1={index * 10}
                                    x2={x2}
                                    y2={index * 10}
                                    key={index}
                                    strokeWidth={STROKE_WIDTH}
                                    stroke="currentColor"
                                />
                            ))
                        }

                        {/* 横线 */}
                        {
                            gridSprings.map(({ y2 }, index) => (
                                <animated.line
                                    x1={index * 10}
                                    y1={0}
                                    x2={index * 10}
                                    y2={y2}
                                    key={index}
                                    strokeWidth={STROKE_WIDTH}
                                    stroke="currentColor"
                                />
                            ))
                        }
                    </g>

                    {
                        boxSprings.map(({ scale }, index) => (
                            <animated.rect
                                key={index}
                                width={10}
                                height={10}
                                fill="currentColor"
                                style={{
                                    transform: `translate(${COORDS[index][0]}px, ${COORDS[index][1]}px)`,
                                    transformOrigin: `5px 5px`,
                                    scale,
                                }}
                            />
                        ))
                    }
                </svg>
            </div>
        </div>
    )
}
