import React, { useEffect } from 'react'

export const ReactEvent = () => {
    // const handleClickTestBox = (e: any) => {
    //     console.warn('handleClickTestBox: ', e);
    //   }
    
    // const handleClickTestBox2 = (e: any) => {
    //     console.warn('handleClickTestBox2: ', e);
    // }
    
    // const handleClickTestBox3 = (e: any) => {
            // 阻止合成事件的冒泡
    //     e.stopPropagation();
    //     console.warn('handleClickTestBox3: ', e);
    // }



    // useEffect(() => {
    //     const handleDocumentClick = (e: any) => {
    //         console.log('handleDocumentClick: ', e);
    //     }
        
    //     document.addEventListener('click', handleDocumentClick, false);

    //     return () => {
    //         document.removeEventListener('click', handleDocumentClick, false);
    //     }
    // }, [])

    // const handleClickTestBox = (e: any) => {
    //     console.warn('handleClickTestBox: ', e);
    //   }
    
    // const handleClickTestBox2 = (e: any) => {
    //     console.warn('handleClickTestBox2: ', e);
    // }
    
    // const handleClickTestBox3 = (e: any) => {
    //     // 阻止合成事件的冒泡
    //     e.stopPropagation();
    //     // 阻止与原生事件的冒泡
    //     e.nativeEvent.stopImmediatePropagation();
    //     console.warn('handleClickTestBox3: ', e);
    // }



    useEffect(() => {
        const handleDocumentClick = (e: any) => {
            console.log('handleDocumentClick: ', e);
        }

        const handleBodyClick = (e: any) => {
            if (e.target && e.target === document.querySelector('#inner')) {
                return;
            }

            console.log('handleBodyClick: ', e);
        }
        
        document.addEventListener('click', handleDocumentClick, false);
        document.body.addEventListener('click', handleBodyClick, false);

        return () => {
            document.removeEventListener('click', handleDocumentClick, false);
            document.body.removeEventListener('click', handleBodyClick, false);
        }
    }, [])

    const handleClickTestBox = (e: any) => {
        console.warn('handleClickTestBox: ', e);
      }
    
    const handleClickTestBox2 = (e: any) => {
        console.warn('handleClickTestBox2: ', e);
    }
    
    const handleClickTestBox3 = (e: any) => {
        // 阻止合成事件的冒泡
        e.stopPropagation();
        // 阻止与原生事件的冒泡
        e.nativeEvent.stopImmediatePropagation();
        console.warn('handleClickTestBox3: ', e);
    }

    return (
        <div>
            <h2>react 阻止事件冒泡</h2>

            {/* <h3>在没有涉及到原生事件注册只有react事件时，用e.stopPropagation()阻止冒泡</h3>
            <div
                className="test-box"
                onClick={handleClickTestBox}
            >
                1

                <div
                    onClick={handleClickTestBox2}
                >
                    2

                    <div
                        onClick={handleClickTestBox3}
                    >
                        3
                    </div>
                </div>
            </div> */}

            {/* <h3 style={{wordBreak: 'break-all'}}>当用document.addEventListener注册了原生的事件后，用e.stopPropagation()是不能阻止与document之间的冒泡，这时候需要用到e.nativeEvent.stopImmediatePropagation()方法</h3>
            <div
                className="test-box"
                onClick={handleClickTestBox}
            >
                1

                <div
                    onClick={handleClickTestBox2}
                >
                    2

                    <div
                        onClick={handleClickTestBox3}
                    >
                        3
                    </div>
                </div>
            </div> */}

            <h3 style={{wordBreak: 'break-all'}}>阻止合成事件与非合成事件（除了document）之间的冒泡，以上两种方式都不适用，需要用到e.target 判断</h3>
            <div
                className="test-box"
                onClick={handleClickTestBox}
            >
                1

                <div
                    onClick={handleClickTestBox2}
                >
                    2

                    <div
                        id="inner"
                        onClick={handleClickTestBox3}
                    >
                        3
                    </div>
                </div>
            </div>
        </div>
    )
}
