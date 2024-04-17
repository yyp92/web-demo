import React, {FC, useEffect, PropsWithChildren} from 'react'

import styles from './index.module.scss'


interface AaaProps {
    children: React.ReactNode
}
  
// const Aaa: FC<AaaProps> = (props) => {
//     const { children } = props;

//     const arr = React.Children.toArray(children);
//     console.log(arr.sort());
  
//     return <div className='container'>
//         {
//             // React.Children.map 会把 children 拍平，而数组的方法不会。
//             React.Children.map(children, (item) => {
//                 return <div className={styles.item}>{item}</div>
//             })
//         }
//     </div>
// }


const Aaa: FC<AaaProps> = (props) => {
    const { children } = props;

    useEffect(() => {
        // React.Children.count 是计数
        const count = React.Children.count(children);
        console.log('count', count);
        
        // forEach 是遍历
        React.Children.forEach(children, (item, index) => {
            console.log('item' + index, item);
        });
    
        // only 是如果 children 不是一个元素就报错
        // const first = React.Children.only(children);
        // console.log('first', first);
    }, []);

    return (
        <div className='container'></div>
    )
}

interface RowListProps1 {
    children?: React.ReactNode
}
  
const RowList1: FC<RowListProps1> = (props) => {
    const { children } = props;
  
    return (
        <div className='row-list'>
            {
                React.Children.map(children, item => {
                    return (
                        <div className='row'>
                            {item}
                        </div>
                    )
                })
            }
        </div>
    )
}


/**
 * * React.Children 的替代方案
 * 不使用 chilren 传入具体内容，而是自己定义一个 prop
 */
interface RowListProps extends PropsWithChildren {
    items: Array<{
        id: number,
        content: React.ReactNode
    }>
}
  
const RowList: FC<RowListProps> = (props) => {
    const { items } = props;

    return (
        <div className='row-list'>
            {
                items.map(item => {
                    return  <div className='row' key={item.id}>{item.content}</div>
                })
            }
        </div>
    )
}

export const ReactChildren = () => {
    return (
        // <Aaa>
        //     <a href="#">111</a>
        //     <a href="#">222</a>
        //     <a href="#">333</a>    
        // </Aaa>

        // <Aaa>
        //     {33}
        //     <span>hello world</span>
        //     {22}
        //     {11}    
        // </Aaa>

        // <RowList1>
        //     <div>111</div>
        //     <div>222</div>
        //     <div>333</div>
        // </RowList1>

        <RowList
            items={[
                {
                    id: 1,
                    content: <div>111</div>
                },
                {
                    id: 2,
                    content: <div>222</div>
                },
                {
                    id: 3,
                    content: <div>333</div>
                }
            ]}
        >
        </RowList>
    )
}