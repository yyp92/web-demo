import { create } from 'zustand'
// import { create } from './myZustand'
// persist 就是同步 store 数据到 localStorage 的
import {persist} from 'zustand/middleware'


// 中间件
// 可以包一层，自己拿到 get、set、store，对这些做一些修改，之后返回一个接受三个参数的函数
function logMiddleware(func: any) {
    return function(set: any, get: any, store: any) {
        function newSet(...args: any) {
            console.log('调用了 set，新的 state：', get());
            return set(...args)
        }
        
        return func(newSet, get, store)
    }
}


// 用 create 函数创建一个 store，定义 state 和修改 state 的方法
// const useXxxStore = create((set) => ({
//     aaa: '',
//     bbb: '',
//     updateAaa: (value: any) => set(() => ({ aaa: value })),
//     updateBbb: (value: any) => set(() => ({ bbb: value })),
// }))

const useXxxStore = create(logMiddleware(persist(
    (set: any) => ({
        aaa: '',
        bbb: '',
        updateAaa: (value: any) => set(() => ({ aaa: value })),
        updateBbb: (value: any) => set(() => ({ bbb: value })),
    }),
    {
        name: 'guang'
    }
)))
  

function Bbb() {
    return <div>
        <Ccc></Ccc>
    </div>
}

function Ccc() {
    const aaa = useXxxStore((state: any) => state.aaa)

    return <p>hello, {aaa}</p>
}

export const MyZustand = () => {
    // 在组件里调用 create 返回的函数，取出属性或者方法在组件里用
    const updateAaa = useXxxStore((state: any) => state.updateAaa)
    const aaa = useXxxStore((state: any) => state.aaa)

    // 还可以调用 subscribe 来添加一个监听器
    // useXxxStore.subscribe((state: any) => {
    //     console.log('useXxxStore.subscribe', useXxxStore.getState())
    // })
  
    return (
        <div>
            <input
                onChange={(e) => updateAaa(e.currentTarget.value)}
                value={aaa}
            />

            <Bbb></Bbb>
        </div>
    )
}
