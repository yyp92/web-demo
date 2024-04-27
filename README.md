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
