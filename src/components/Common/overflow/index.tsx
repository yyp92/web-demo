/**
 * * 根据文本的长度自动出现省略号，并且移上去出现 tootip
 */
import React from 'react'
import {Tooltip} from 'antd'
import {checkIsOverflowed} from '@/utils'

interface OverflowProps {
    text: string
    width: number
    ellipsisWidth: number
    className?: any
    isMove?: boolean
}

const Overflow: React.FC<OverflowProps> = ({
    text,
    width,
    ellipsisWidth,
    className = '',
    isMove = false
}) => {
    const overflowRef = React.useRef<HTMLDivElement>(null)
    // 是否出现省略号
    const [isOverflow, setIsOverflow] = React.useState<boolean>(false)
    const [moveing, setMoveing] = React.useState<boolean>(false)

    React.useEffect(() => {
        const isOverflowed = checkIsOverflowed(overflowRef?.current, width)
        setIsOverflow(isOverflowed)
    }, [overflowRef.current])

    React.useEffect(() => {
        setMoveing(isMove)
    }, [isMove])


    const renderItem = () => {
        if (!isOverflow) {
            return <div>{text || '-'}</div>
        }

        if (moveing) {
            return (
                <div
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        width: ellipsisWidth
                    }}
                >{text}</div> 
            )
        }

        return (
            <Tooltip
                title={text}
                overlayClassName={className}
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
            // style={{
            //     width: width
            // }}
        >
            {renderItem()}
        </div>
    )
}

export default Overflow