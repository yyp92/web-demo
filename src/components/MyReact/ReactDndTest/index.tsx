/**
 * react-dnd 拖拽
 */
import {useEffect, useRef, useState, useCallback} from 'react'
import c from 'classnames'
import {useDrag, useDrop, DndProvider, useDragLayer} from 'react-dnd'
import {HTML5Backend, getEmptyImage} from 'react-dnd-html5-backend'

import styles from './index.module.scss'


interface ItemType {
    color: string;
}
interface BoxProps {
    color: string
}

const DragLayer = () => {
    // useDragLayer 的参数是函数，能拿到 monitor，从中取出很多东西，比如 item、isDragging，还是有 clientOffset，也就是拖拽过程中的坐标。
    const {
        isDragging,
        item,
        currentOffset
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset(),
    }))
  
    if (!isDragging) {
        return null
    }

    return (
        <div
            className={styles['drag-layer']}
            style={{
                left: currentOffset?.x,
                top: currentOffset?.y
            }}
        >{item.color} 拖拖拖</div>
    )
}

function Box(props: BoxProps) {
    const {
        color
    } = props ?? {}
    // 用 useRef 保存 dom 引用
    const ref = useRef(null)

    // 用 useDrag 返回的第二个参数处理它
    const [{dragging}, drag, dragPreview]= useDrag({
        // 和 useDrop accept字段改为一致
        type: 'box',
        item: {
            color,
        },
        
        // collect 的返回值会作为 useDrag 的返回的第一个值。
        collect(monitor) {
            return {
                dragging: monitor.isDragging()
            }
        }
    })

    // 这种逻辑只要执行一次就行
    useEffect(() => {
        drag(ref)
        dragPreview(getEmptyImage())
    }, [])

    

    return (
        <div
            ref={ref}
            className={c(
                styles.box,
                {
                    [styles.dragging]: dragging,
                }
            )}
            style={{
                background: color || 'blue'
            }}
        ></div>
    )
}

function Container() {
    const ref = useRef(null)
    // 增加一个 boxes 数组的 state，在 drop 的时候把 item 加到数组里，并触发渲染
    const [boxes, setBoxes] = useState<ItemType[]>([]);

    // 用 useDrop 让它可以接受拖拽过来的元素
    const [, drop] = useDrop(() => {
        return {
            accept: 'box',
            drop(item: ItemType) {
                // 这里 setBoxes 用了函数的形式，这样能拿到最新的 boxes 数组，不然会形成闭包，始终引用最初的空数组。
                setBoxes((boxes) => [...boxes, item])
            }
        }
    })

    useEffect(() => {
        drop(ref)
    }, [])
    

    return (
        <div
            ref={ref}
            className={styles.container}
        >
            {
                boxes.map((item, index) => {
                    return <Box key={`${index}`} color={item.color}></Box>
                })
            }
        </div>
    )
}

export const ReactDndTest = () => {
    return (
        <DndProvider backend={HTML5Backend}>
             <div>
                <Container></Container>

                <Box color='blue'></Box>
                <Box color='red'></Box>
                <Box color='green'></Box>

                <DragLayer></DragLayer>
            </div>
        </DndProvider>
    )
}





/**
 * 拖拽排序
 */
// interface CardItem {
//     id: number;
//     content: string;
// }

// interface CardProps {
//     data: CardItem

//     // 增加 index 和 swapIndex 两个参数
//     index: number;
//     swapIndex: Function;
// }

// // 声明 drag 传递的 item 数据的类型
// interface DragData {
//     id: number;
//     index: number;
// }

// function Card(props: CardProps) {
//     const {
//         data,
//         index,
//         swapIndex
//     } = props
//     const ref = useRef(null)

//     const [{dragging}, drag] = useDrag({
//         type: 'card',
//         item: {
//             id: data.id,
//             index
//         },

//         // 拖拽时的样式
//         collect(monitor) {
//             return {
//                 dragging: monitor.isDragging()
//             }
//         }
//     })

//     const [, drop] = useDrop({
//         accept: 'card',

//         // hover 的时候改变位置
//         hover(item: DragData) {
//             swapIndex(index, item.index)

//             // 解决： 因为交换位置后，没有修改 item.index 为新的位置，导致交换逻辑一致触发
//             item.index = index
//         }

//         // drop(item: DragData) {
//         //     swapIndex(index, item.index)
//         // }
//     })

    

//     useEffect(() => {
//         drag(ref)
//         drop(ref)
//     }, [])


//     return (
//         <div
//             ref={ref}
//             className={c(
//                 styles.card,
//                 {
//                     [styles.cardDragging]: dragging
//                 }
//             )}
//         >{data.content}</div>
//     )
// }

// export const ReactDndTest = () => {
//     const [cardList, setCardList] = useState<CardItem[]>([
//         {
//             id:0,
//             content: '000',
//         },
//         {
//             id:1,
//             content: '111',
//         },
//         {
//             id:2,
//             content: '222',
//         },
//         {
//             id:3,
//             content: '333',
//         },
//         {
//             id:4,
//             content: '444',
//         }
//     ])

//     const swapIndex = useCallback((index1: number, index2: number) => {
//         const tmp = cardList[index1]
//         cardList[index1] = cardList[index2]
//         cardList[index2] = tmp

//         setCardList([...cardList])
//     }, [])

//     return (
//         <DndProvider backend={HTML5Backend}>
//             <div className={styles['card-list']}>
//                 {
//                     cardList.map((item: CardItem, index) => (
//                         <Card
//                             data={item}
//                             key={'card_' + item.id}
//                             index={index}
//                             swapIndex={swapIndex}
//                         />
//                     ))
//                 }
//             </div>
//         </DndProvider>
//     )
// }
