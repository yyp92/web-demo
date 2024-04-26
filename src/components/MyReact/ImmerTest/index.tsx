/**
 * immer
 */
import {useState, useEffect, PureComponent} from 'react'
import {produce} from 'immer'

// export class ImmerTest extends PureComponent {
//     state: any

//     constructor(props: any) {
//         super(props)

//         this.state = {
//             a: {
//                 b: 1
//             }
//         }
//     }

//     componentDidMount(): void {
//         setTimeout(() => {
//             this.setState(produce(this.state, (draft: any) => {
//                 draft.a.b = 2
//             }))
//         }, 2000)
//     }

//     render() {
//         return (
//             <div>
//                 {this.state.a.b}
//             </div>
//         )
//     }
// }



export const ImmerTest = () => {
    const [state, setState] = useState<any>({
        a: {
            b: 1
        }
    })

    useEffect(() => {
        setTimeout(() => {
            setState(produce(state, (draft: any) => {
                draft.a.b = 2
            }))
        }, 2000)
    }, [])


    return (
        <div>{state.a.b}</div>
    )
}