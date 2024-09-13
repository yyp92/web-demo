import { useEffect, useMemo } from "react";
import {
    styled,
    createGlobalStyle,
    css
} from "styled-components"

export const OnlinePiano = () => {
    const keys: Record<string, { frequency: number }> = {
        A: {
            frequency: 196
        },
        S: {
            frequency: 220
        },
        D: {
            frequency: 246
        },
        F: {
            frequency: 261
        },
        G: {
            frequency: 293
        },
        H: {
            frequency: 329
        },
        J: {
            frequency: 349
        },
        K: {
            frequency: 392
        }
    }

    const map: Record<number, string> = {
        1: 'A',
        2: 'S',
        3: 'D',
        4: 'F',
        5: 'G',
        6: 'H',
        7: 'J',
        8: 'K'
    }

    // 创建 AudioContext，这个不需要每次渲染都创建，所以用 useMemo 包裹
    const context = useMemo(() => {
        return new AudioContext();
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            play(e.key.toUpperCase())
        })
    }, [])

    const play = (key: string) => {
        const frequency = keys[key]?.frequency

        if (!frequency) {
            return
        }

        // 然后创建 oscillator 节点、gain 节点、destination 节点，连接起来
        const osc = context.createOscillator()
        osc.type = 'sine'

        const gain = context.createGain()
        osc.connect(gain)
        gain.connect(context.destination)

        osc.frequency.value = frequency
        // 在 currentTime 当前时间设置音量为 0
        // 然后 0.01 秒后设置为 1，也就是声音是逐渐变大的（linear 是线性）
        // 然后在 1 秒后设置音量为 0.01，也就是声音指数级的变小。（exponential 是指数级）
        // 这样，按每个键声音都是一秒，但这一秒内有音量从小到大再到小的变化。
        gain.gain.setValueAtTime(0, context.currentTime)
        gain.gain.linearRampToValueAtTime(1, context.currentTime + 0.01)

        osc.start(context.currentTime)

        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1)
        osc.stop(context.currentTime + 1)


        // 键盘控制
        document.getElementById(`key-${key}`)?.classList.add('pressed')
        setTimeout(() => {
            document.getElementById(`key-${key}`)?.classList.remove('pressed')
        }, 100)
    }

    // 世上只有妈妈好的乐谱
    function playSong1() {
        const music = [
            [6, 1000],
            [5, 1000],
            [3, 1000],
            [5, 1000],
            [8, 1000],
            [6, 500],
            [5, 500],
            [6, 1000]
        ]

        let startTime = 0
        music.forEach((item) => {
            setTimeout(() => {
                play(map[item[0]])
            }, startTime)

            startTime += item[1]
        })
    }

    function playMusic(music: number[][]) {
        let startTime = 0

        music.forEach((item) => {
            setTimeout(() => {
                play(map[item[0]])
            }, startTime * 0.5)

            startTime += item[1]
        })
    }

    // 奢香夫人的乐谱
    function playSong2() {
        const music = [
            [6, 1000],
            [6, 1000],
            [6, 1000],
            [3, 500],
            [6, 500],

            [5, 1000],
            [3, 500],
            [2, 500],
            [3, 1000],

            [2, 500],
            [3, 500],
            [2, 1000],
            [8, 1000],
            [5, 500],
            [5, 500],

            [6, 1000],
            [7, 500],
            [6, 500],
            [6, 1000],

            [6, 1000],
            [6, 1000],
            [6, 1000],
            [3, 500],
            [6, 500],
        ]

        playMusic(music)
    }


    // 用 createGlobalStyle 写全局样式
    const GlobalStyles = createGlobalStyle`
        body {
            background: #000;
        }
        .pressed {
            background: #aaa;
        }
    `

    // 用 styled.xxx 写样式组件
    const KeysStyle = styled.div`
        width: 800px;
        height: 400px;
        margin: 40px auto;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        overflow: hidden;
    `

    // 用 css 创建复用的 css 片段
    const textStyle = css`
        line-height: 500px;
        text-align: center;
        font-size: 50px;
    `

    const KeyStyle = styled.div`
        border: 4px solid black;
        background: #fff;
        flex: 1;
        ${textStyle}

        &:hover {
            background: #aaa;
        }
    `

    // 可以用 as 修改渲染的标签
    return (
        <div>
            <KeysStyle as='section'>
                {
                    Object.keys(keys).map((item: any) => {
                        return (
                            <KeyStyle
                                as='div'
                                key={item}
                            >
                                <div
                                    id={`key-${item}`}
                                    onClick={() => play(item)}
                                >
                                    <span>{item}</span>
                                </div>
                            </KeyStyle>
                        )
                    })
                }

                <GlobalStyles />
            </KeysStyle>

            <div className='songs'>
                <button onClick={() => playSong1()}>世上只有妈妈好</button>

                <button onClick={() => playSong2()}>奢香夫人</button>
            </div>
        </div>
    )
}
