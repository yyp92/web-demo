import React from 'react'
import c from 'classnames'
import s from './index.module.scss'

export const BubbleLoading = () => {
    const [list, setList] = React.useState<number[]>([])

    React.useEffect(() => {
        const list = []

        for (let i = 0; i < 200; i++) {
            list.push(i)
        }

        setList(list)
    }, [])

    return (
        <div className={s.bubbleLoading}>
            <h2>气泡 Loading</h2>

            <h3>圆弧的实现</h3>
            <div className={s.gContainer}>
                <div className={s.gCircle}></div>
            </div>

            <h3>气泡的实现</h3>
            <div className={s.gContainer}>
                <div className={s.gCircle}></div>
                <ul className={s.gBubbles}>
                    {
                        list.map(item => {
                            return <li key={item} className={s.gBubble}></li>
                        })
                    }
                </ul>
            </div>

            <h3>借助滤镜实现粘性气泡效果</h3>
            <div className={s.gContainer}>
                <div className={c(s.gContainer, s.gContainer1)}>
                    <div className={s.gCircle}></div>
                    <ul className={s.gBubbles}>
                        {
                            list.map(item => {
                                return <li key={item} className={s.gBubble}></li>
                            })
                        }
                    </ul>
                </div>
            </div>

            <h3>修复违和感</h3>
            <div className={s.gContainerWrap}>
                <div className={c(s.gContainer2)}>
                    <div className={s.gCircle}></div>
                    <ul className={s.gBubbles}>
                        {
                            list.map(item => {
                                return <li key={item} className={s.gBubble}></li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
