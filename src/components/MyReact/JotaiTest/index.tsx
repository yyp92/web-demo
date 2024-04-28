/**
 * * Jotai 采用原子方法进行全局React状态管理
 */
import { atom, useAtom, useSetAtom, useAtomValue } from 'jotai' 
import { atomWithStorage } from 'jotai/utils'

// const aaaAtom = atom(0)
// const bbbAtom = atom(0)

// const sunAtom = atom((get) => {
//     return get(aaaAtom) + get(bbbAtom)
// })

// function Aaa() {
//     const [aaa, setAaa] = useAtom(aaaAtom)
    
//     console.log('Aaa render...')

//     return <div>
//         aaa: {aaa}

//         <button onClick={() => setAaa(aaa + 1)}>加一</button>
//     </div>
// }

// function Bbb() {
//     const [bbb, setBbb] = useAtom(bbbAtom)

//     console.log('Bbb render...')

//     return <div>
//         bbb: {bbb}

//         <button onClick={() => setBbb(bbb + 1)}>加一</button>
//     </div>
// }

// export const JotaiTest = () => {
//     const [sum] = useAtom(sunAtom)

//     return (
//         <div>
//             sum: {sum}

//             <Aaa></Aaa>
//             <Bbb></Bbb>
//         </div>
//     )
// }






/**
 * 异步逻辑，比如请求服务端接口来拿到数据，这种也是一个放在全局 store，一个单独放在原子状态里
 */
// async function getListById(id: any) {
//     const data: any = {
//         1: ['a1', 'a2', 'a3'],
//         2: ['b1', 'b2', 'b3', 'b4']
//     }

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(data[id])
//         }, 2000)
//     })
// }

// const listAtom = atom([])

// const fetchDataAtom = atom(null, async (get, set, param) => {
//     const data = await getListById(param)

//     set(listAtom, data as any)
// })

// const dataAtom = atom(
//     (get) => {
//         return get(listAtom);
//     },
//     async (get, set, param) => {
//         const data: any = await getListById(param);
//         set(listAtom, data);
//     }
// )

// export const JotaiTest = () => {
//     // const [,fetchListData] = useAtom(fetchDataAtom)
//     // const [list] = useAtom(listAtom)

//     // const fetchListData = useSetAtom(fetchDataAtom)
//     // const list = useAtomValue(listAtom)

//     const [list, fetchListData] = useAtom(dataAtom)

//     return (
//         <div>
//             <button onClick={() => fetchListData(2)}>列表222</button>

//             <ul>
//                 {
//                     list.map(item => {
//                         return <li key={item}>{item}</li>
//                     })
//                 }
//             </ul>
//         </div>
//     )
// }




/**
 * 用 useSetAtom 有时候可以起到性能优化的作用
 */
// const aaaAtom = atom(0);

// function Aaa() {
//     const [aaa] = useAtom(aaaAtom)

//     console.log('Aaa render...')

//     return <div>
//         {aaa}
//     </div>
// }

// // 而其实 Bbb 组件不需要重新渲染
// function Bbb() {
//     // const [, setAaa] = useAtom(aaaAtom)
//     const setAaa = useSetAtom(aaaAtom)

//     console.log('Bbb render...')

//     return <div>
//         <button onClick={() => setAaa(Math.random())}>按钮</button>
//     </div>
// }

// export const JotaiTest = () => {
//     return <div>
//         <Aaa></Aaa>
//         <Bbb></Bbb>
//     </div>
// }




/**
 * 中间件
 * jotai 里是用 utils 包的 atomWithStorage
 */
const countAtom = atomWithStorage('count-key2', 0)

export const JotaiTest = () => {
    const [count, setCount] = useAtom(countAtom);
    
    return <div>
        count: {count}
        
        <button onClick={() => setCount(count + 1)}>加一</button>
    </div>
}
