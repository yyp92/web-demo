/**
 * useMutateObserver  封装了 MutationObserver 的调用
 */
import { useEffect } from "react";

const defaultOptions: MutationObserverInit = {
    subtree: true,
    childList: true,
    attributeFilter: ['style', 'class'],
};

export default function useMutateObserver(
    // 支持单个节点，多个节点的 observe
    nodeOrList: HTMLElement | HTMLElement[],
    callback: MutationCallback,
    options: MutationObserverInit = defaultOptions,
) {
    useEffect(() => {
        if (!nodeOrList) {
            return
        }

        let instance: MutationObserver

        const nodeList = Array.isArray(nodeOrList)
            ? nodeOrList
            : [nodeOrList]

        if ('MutationObserver' in window) {
            instance = new MutationObserver(callback)

            nodeList.forEach(element => {
                instance.observe(element, options)
            })
        }

        return () => {
            // 删除所有待处理的通知
            instance?.takeRecords()

            // 阻止 MutationObserver 实例继续接收的通知
            instance?.disconnect()
        }
    }, [options, nodeOrList])
}
