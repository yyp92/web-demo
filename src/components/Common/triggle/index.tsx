import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react'
import {animated, useSpring} from '@react-spring/web'
import c from 'classnames'

import styles from './index.module.scss'

interface TriggleProps {
    title: React.ReactNode
    children: React.ReactNode
    triggle?: boolean
    formHeight?: number
}

const Triggle: React.FC<TriggleProps> = ({
    title,
    children,
    triggle = false,
    formHeight = 36
}) => {
    const innerRef = useRef<HTMLDivElement>(null)
    const [{ height }, api] = useSpring(() => ({
        from: { height: formHeight },
        config: {
            precision: 0.01,
            mass: 1,
            tension: 200,
            friction: 25,
            clamp: true,
        },
    }))
    const [troggle, setTroggle] = useState<boolean>(false)
    const isInit = useRef<number>(0)

    useEffect(() => {
        setTroggle(triggle)
    }, [triggle])

    // 动画
    useLayoutEffect(() => {
        const inner = innerRef.current
        if (!inner) return

        if (troggle) {
            api.start({
                height: inner.offsetHeight,
            })
        }
        else {
            api.start({
                height: formHeight,
            })
        }

        return () => {
            if (!troggle) return
            
            const inner = innerRef.current
            
            if (!inner) return
            
            api.start({
                height: inner.offsetHeight,
                immediate: true,
            })
        }
    }, [troggle])

    return (
        <div
            className={styles.triggerWraper}
        >
            <animated.div
                style={{
                    height: height.to(v => {
                        if (height.idle && troggle) {
                            return 'auto'
                        }
                        else {
                            return v
                        }
                    }),
                }}
            >
                <div
                    className={styles.box}
                    ref={innerRef}
                >
                    <div
                        className={styles.title}
                        onClick={(e: any) => {
                            e.preventDefault();
                            setTroggle(!troggle)
                            isInit.current++
                        }}
                    >
                        <div
                            className={styles.left}
                            // onClick={(e: any) => e.stopPropagation()}
                        >
                            {title}
                        </div>

                        <div className={styles.right}>
                            <span
                                className={c(
                                    'iconfont',
                                    'icon-arrow-right',
                                    styles.icon,
                                    {
                                        [styles.animated1]: troggle,
                                        [styles.animated2]: !troggle,
                                    }
                                )}
                                style={{
                                    fontSize: '16px',
                                    display: 'inline-block'
                                }}
                            ></span>
                        </div>
                    </div>

                    <div>{children}</div>
                </div>
            </animated.div>
        </div>
    )
}

export default Triggle