# web-demo
实现各种网页交互效果。

## 实现目录
- 前端下载

- css
    - :empty
    - position: sticky
    - background-clip




## context
用 createContext 创建 context 对象，用 Provider 修改其中的值， function 组件使用 useContext 的 hook 来取值，class 组件使用 Consumer 来取值。

### context 是怎么实现
- 首先是 createContext 方法，这个方法返回的是一个对象，记住这 3 个属性就可以了：
- _currentValue： 保存 context 的值的地方，不建议直接改
- Provider： ContextProvider 类型的 jsx
- Consumer： ContextConsumer 类型的 jsx


### 总结
- createCotnext 就是创建了一个 _currentValue、Provider、Consumer 的对象。
- _currentValue 就是保存值的地方
- Provider 是一种 jsx 类型，之后会转为对应的 fiber 类型，然后它的处理就是修改 _currentValue，也就是修改 context 值
- Consumer 和 useCotnext 就是读取 _currentValue，也就是读取 context 值
- 唯一要注意的是 Provider 处理每个节点之前会入栈 context，处理完会出栈，这样就能保证 context 只影响子组件。


### context问题
context 在跨层传递数据方面很好用，在组件库里用的很多，但是它也有一些性能方面的缺点。

context 中如果是一个对象，不管任意属性变了，都会导致依赖其它属性的组件跟着重新渲染。

解决这个问题有几种方案：
- 拆分 context，每种数据放在一个 context 里
- 用 zustand 等状态管理库，因为它们不是用 context 实现的，自然没有这种问题
- 用 memo 包裹子组件，它会对比新旧 props，没变就不会重新渲染




## zustand

原理：zustand 本身的实现也很简单，就是 getState、setState、subscribe 这些功能，然后再加上 useSyncExternalStore 来触发组件 rerender。

它的核心就是一个 create 函数，传入 state 来创建 store。

create 返回的函数可以传入 selector，取出部分 state 在组件里用。

它的中间件和 redux 一样，就是一个高阶函数，可以对 get、set 做一些扩展。




## jotai
### 核心功能
- 通过 atom 创建原子状态，定义的时候还可以单独指定 get、set 函数（或者叫 read、write 函数），用来实现状态派生、异步状态修改。
- 组件里可以用 useAtom 来拿到 get、set 函数，也可以通过 useAtomValue、useSetAtom 分别拿。
- 不需要读取状态的，用 useSetAtom 还可以避免不必要的渲染。

### zustand 和 jotai区别
- zustand 是所有 state 放在全局 store 里，然后用到的时候 selector 取需要的部分。
- jotai 是每个 state 单独声明原子状态，用到的时候单独用或者组合用。
- 一个自上而下，一个自下而上，算是两种思路。
- zustand 的中间件是通过包一层然后修改 get、set 实现的，而 jotai 天然支持 get、set 的修改。
