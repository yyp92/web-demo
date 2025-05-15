import { FC, useRef, useEffect, useState } from 'react'
import { Tooltip } from 'antd'


export const checkIsOverflowed = (
    ref: any, 
    width: number = 0,
    fontSize: number = 12
) => {
    const element = ref
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '9999px';
    tempDiv.style.fontSize = `${fontSize}px`

    tempDiv.textContent = element.textContent;
    document.body.appendChild(tempDiv);

    const isOverflowed = tempDiv.clientWidth > width;

    document.body.removeChild(tempDiv);

    return isOverflowed
}

interface OverflowProps {
    text: React.ReactNode
    width: number
    ellipsisWidth: number
    fontSize?: number
    className?: any
    tooltipOverlayClassName?: any
    style?: any
}

export const OverflowTooltip: FC<OverflowProps> = ({
    text,
    width,
    ellipsisWidth,
    fontSize = 14,
    className = '',
    tooltipOverlayClassName = '',
    style = {},
}) => {
    const overflowRef = useRef<HTMLDivElement>(null)
    // 是否出现省略号
    const [isOverflow, setIsOverflow] = useState<boolean>(false)

    useEffect(() => {
        const isOverflowed = checkIsOverflowed(overflowRef?.current, width, fontSize)
        setIsOverflow(isOverflowed)
    }, [overflowRef.current, text])

    const renderItem = () => {
        if (!isOverflow) {
            return <div>{text}</div>
        }

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
                        width: ellipsisWidth
                    }}
                >{text}</div>
            </Tooltip>
        )
    }

    return (
        <div
            ref={overflowRef}
            className={className}
            style={style}
        >
            {renderItem()}
        </div>
    )
}
