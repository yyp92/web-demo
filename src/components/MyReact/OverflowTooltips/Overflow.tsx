/**
 * * aria-hidden: https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden
 * * \u00A0:  HTML 中的作用主要是表示不换行空格, 保持文本连续性：在一些需要保持特定文本内容在同一行显示，避免因浏览器窗口大小调整或其他因素导致换行的场景中，\u00A0非常有用。
 */
import { FC, useRef, useEffect, useState, useLayoutEffect, Fragment } from 'react'
import { Tooltip } from 'antd'

enum MEASURE_STATUS {
    PREPARE = 1,
    ELLIPSIS = 99,
    NO_ELLIPSIS = 100
}

const measureStyle: React.CSSProperties = {
    visibility: 'hidden',
    whiteSpace: 'inherit',
    lineHeight: 'inherit',
    fontSize: 'inherit',
}

interface OverflowProps {
    text: React.ReactNode
    width: number
    fontSize?: number
    className?: any
    tooltipOverlayClassName?: any
    style?: any
}

export const OverflowTooltip: FC<OverflowProps> = ({
    text,
    width,
    className = '',
    tooltipOverlayClassName = '',
    style = {},
}) => {
    const [status, setStatus] = useState<MEASURE_STATUS>(
        MEASURE_STATUS.PREPARE
    )
    const singleRowMeasureRef = useRef<HTMLDivElement>(null)
    const fullMeasureRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (status === MEASURE_STATUS.PREPARE) {
            const fullMeasureHeight = fullMeasureRef.current?.offsetHeight || 0
            const singleRowMeasureHeight = singleRowMeasureRef.current?.offsetHeight || 0

            if (fullMeasureHeight <= singleRowMeasureHeight) {
                setStatus(MEASURE_STATUS.NO_ELLIPSIS)
            }
            else {
                setStatus(MEASURE_STATUS.ELLIPSIS)
            }
        }
    }, [status])

    const renderContent = () => {
        if (status === MEASURE_STATUS.NO_ELLIPSIS) {
            return (
                <div>{text}</div>
            )
        }

        if (status === MEASURE_STATUS.ELLIPSIS) {
            return (
                <Tooltip
                    title={text}
                    overlayClassName={tooltipOverlayClassName}
                >
                    <div
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: width
                        }}
                    >{text}</div>
                </Tooltip>
            )
        }

        return null
    }

    const renderItem = () => {
        return (
            <>
                {/* 文本完全显示，折行显示 */}
                {
                    status === MEASURE_STATUS.PREPARE && (
                        <div
                            key='full'
                            aria-hidden
                            ref={fullMeasureRef}
                            style={{
                                ...measureStyle,
                                width: width
                            }}
                        >
                            {text}
                        </div>
                    )
                }

                {/* 控制单行显示 */}
                {
                    status === MEASURE_STATUS.PREPARE && (
                        <div
                            key='stable'
                            aria-hidden
                            ref={singleRowMeasureRef}
                            style={{
                                ...measureStyle,
                                width: width
                            }}
                        >
                            {'\u00A0'}
                        </div>
                    )
                }

                {/* 真正的显示文本 */}
                {renderContent()}
            </>
        )

    }

    return (
        <div
            className={className}
            style={{
                ...style,
                overflow: 'hidden',
                wordBreak: 'break-word'
            }}
        >
            {renderItem()}
        </div>
    )
}
