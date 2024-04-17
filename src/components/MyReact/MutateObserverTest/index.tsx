/**
 * * 浏览器提供了 MutationObserver 的 api，可以监听 dom 的变化，包括子节点的变化、属性的变化。
 */
import { useEffect, useRef, useState } from 'react'
import MutateObserver from '../components/MutateObserver';

// 原生 MutateObserver
export const MutateObserverTest1 = () => {
    const [ className, setClassName] = useState('aaa');

    useEffect(() => {
        setTimeout(() => setClassName('bbb'), 2000);
    }, []);

    const containerRef = useRef(null);

    useEffect(() => {
        const targetNode = containerRef.current!;
    
        const callback = function (mutationsList: MutationRecord[]) {
            console.log(mutationsList);
        };
        
        const observer = new MutationObserver(callback);
        observer.observe(
            targetNode,
            { 
                // 监听属性变化
                attributes: true, 

                // 监听 children 变化
                childList: true,
                
                // 连带子节点的属性、children 变化也监听
                subtree: true,

                // 指定监听哪些属性的变化
                attributeFilter: ['className']
            }
        );
    }, []);

    return (
        <div>
            <div
                id="container"
                ref={containerRef}
            >
                <div className={className}>
                    {
                        className === 'aaa'
                            ? <div>aaa</div>
                            : (
                                <div>
                                    <p>bbb</p>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export const MutateObserverTest = () => {
    const [className, setClassName] = useState('aaa');

    useEffect(() => {
        setTimeout(() => setClassName('bbb'), 2000);
    }, []);

    const callback = function (mutationsList: MutationRecord[]) {
        console.log(mutationsList);
    };

    return (
        <div>
            <MutateObserver onMutate={callback}>
                <div id="container">
                    <div className={className}>
                        {
                            className === 'aaa'
                                ? <div>aaa</div>
                                : (
                                    <div>
                                        <p>bbb</p>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </MutateObserver>
        </div>
    )
}