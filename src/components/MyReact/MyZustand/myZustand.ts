/**
 * 自己实现zustand
 */
import { useEffect, useState, useSyncExternalStore  } from "react"

const createStore = (createState: any) => {
    // state 是全局状态
    let state: any
    // listeners 是监听器
    const listeners = new Set()
  
    // setState 修改状态
    //  replace，这是 zustand 在 set 状态的时候默认是合并，你也可以传一个 true 改成替换
    const setState = (partial: any, replace: any) => {
        const nextState = typeof partial === 'function'
            ? partial(state)
            : partial

        if (!Object.is(nextState, state)) {
            const previousState = state

            if (!replace) {
                state = (typeof nextState !== 'object' || nextState === null)
                    ? nextState
                    : Object.assign({}, state, nextState)
            }
            else {
                state = nextState
            }

            listeners.forEach((listener: any) => listener(state, previousState))
        }
    }
  
    // getState 读取状态
    const getState = () => state
  
    // subscribe 添加监听器
    const subscribe= (listener: any) => {
        listeners.add(listener)

        return () => listeners.delete(listener)
    }
  
    // destroy 清除所有监听器
    const destroy= () => {
        listeners.clear()
    }
  
    const api = {
        setState,
        getState,
        subscribe,
        destroy
    }

    state = createState(setState, getState, api)

    return api
}

// 状态变了，触发渲染
function useStore(api: any, selector: any) {
    // const [, forceRender] = useState(0)

    // useEffect(() => {
    //     api.subscribe((state: any, prevState: any) => {
    //         const newObj = selector(state)
    //         const oldobj = selector(prevState)

    //         if(newObj !== oldobj) {
    //             // 用 useState 设置随机数来触发渲染
    //             forceRender(Math.random())
    //         }       
    //     })
    // }, [])

    // return selector(api.getState())



    // * 简化代码
    function getState() {
        return selector(api.getState())
    }

    return useSyncExternalStore(api.subscribe, getState)
}


export const create = (createState: any) => {
    // 调用 createStore 创建 store
    const api = createStore(createState)

    // 返回 useStore 的函数，用于组件内调用
    // selector 说的是 useXxxStore((state: any) => state.aaa) 传入的这个函数
    const useBoundStore = (selector: any) => useStore(api, selector)

    Object.assign(useBoundStore, api)

    return useBoundStore
}
