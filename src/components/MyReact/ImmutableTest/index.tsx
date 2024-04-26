/**
 * 数据不可变
 */
import { PureComponent, useEffect, useState } from 'react'
import {fromJS} from 'immutable'

// export class ImmutableTest extends PureComponent {
//     state: any

//     constructor(props: any) {
//         super(props)

//         // react 需要把每个 key 的值取出来对比下变没变，而 immutable 对象只能用 get、getIn 来取，所以class 组件里不能把整个 state 变为 immutable，只能把某个 key 值的对象变为 immutable。
//         this.state = {
//             a: fromJS({
//                 b: 1
//             })
//         }
//     }

//     componentDidMount(): void {
//         setTimeout(() => {
//             this.setState({
//                 a: this.state.a.setIn(['b'], 2)
//             })
//         }, 2000)
//     }

//     render() {
//         return (
//             <div>
//                 {this.state.a.get('b')}
//             </div>
//         )
//     }
// }



export const ImmutableTest = () => {
    const [state, setState] = useState<any>(
        fromJS({
            a: {
                b: 1
            }
        })
    )

    useEffect(() => {
        setTimeout(() => {
            setState(state.setIn(['a', 'b'], 2))
        }, 2000)
    }, [])


    return (
        <div>{state.getIn(['a', 'b'])}</div>
    )
}
