/**
 * MutateObserver 组件封装了 ref 的获取
 */
import React, { useLayoutEffect } from 'react';
import useMutateObserver from './useMutateObserver';

interface MutationObserverProps{
    options?: MutationObserverInit;
    onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
    children: React.ReactElement;
}

const MutateObserver: React.FC<MutationObserverProps> = (props) => {
    const { 
        options, 
        onMutate = () => {},
        children, 
    } = props;

    const elementRef = React.useRef<HTMLElement>(null);
    const [target, setTarget] = React.useState<HTMLElement>();
  
    useMutateObserver(target!, onMutate, options);
  
    useLayoutEffect(() => {
        setTarget(elementRef.current!);
    }, []);
  
    if (!children) {
        return null;
    }
  
    // 通过 React.cloneElement 给 children 加上 ref 来获取 dom 节点
    return React.cloneElement(children, { ref: elementRef });
}

export default MutateObserver