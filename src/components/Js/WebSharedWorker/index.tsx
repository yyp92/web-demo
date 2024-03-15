import {useEffect, useRef} from 'react'
import styles from './index.module.scss'

import {
    WorkerMessage,
    WindowState,
    generateId,
    getCurrentWindowState,
} from "./windowState"


interface Coordinates {
    x: number
    y: number
}

/**
 * * 这里收到消息之后浏览器控制台没有任何打印信息，因为SharedWorker的作用域中没有window对象，所以console、alert等方法都是无法使用的。
 * * 如果我们需要调试SharedWorker，可以在浏览器地址栏中输入chrome://inspect/#workers，这样就可以看到当前页面中的SharedWorker。
 */

export const WebSharedWorker = () => {
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    let id = generateId();

    useEffect(() => {
        const canvas = canvasRef.current;
       
        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // const sharedWorker = new SharedWorker(new URL("worker.ts", import.meta.url));
                // let currentWindow = getCurrentWindowState();
    
                // sharedWorker.port.postMessage({
                //     action: "windowStateChanged",
                //     payload: {
                //         id,
                //         newWindow: currentWindow,
                //     },
                // });

                // sharedWorker.port.onmessage = (event: MessageEvent<WorkerMessage>) => {
                //     const msg: any = event.data;
                //     console.log('====msg', msg)
    
                //     switch (msg.action) {
                //         case "sync": {
                //             const windows = msg.payload.allWindows;
                            
                //             ctx.reset();
    
                //             drawCenterCircle(ctx, getWindowCenter());

                            
                //             console.log('====windows', windows)
    
                //             windows.forEach(({ windowState: targetWindow }: any) => {
                //                 // console.log('====targetWindow', targetWindow)
                //                 drawConnectingLine({
                //                     ctx,
                //                     hostWindow: currentWindow?.windowState,
                //                     targetWindow,
                //                 });
                //             });
                //         }
                //     }
                // };
    
                // todo 暂时注释，需要的时候打开
                // setInterval(() => {
                //     const newWindow = getCurrentWindowState();
    
                //     if (
                //         didWindowChange({
                //             newWindow,
                //             oldWindow: currentWindow,
                //         })
                //     ) {
                //         sharedWorker.port.postMessage({
                //             action: "windowStateChanged",
                //             payload: {
                //                 id,
                //                 newWindow: newWindow.windowState,
                //             },
                //         });

                //         currentWindow = newWindow;
                //     }
                //   }, 100);
            }
        }
    }, [canvasRef.current])

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext('2d');
            // 获取设备的像素比例
            const devicePixelRatio = window.devicePixelRatio || 1;
            // 设置 Canvas 的显示尺寸
            canvas.style.width = canvas.width + "px";
            canvas.style.height = canvas.height + "px";
            // 设置 Canvas 的画布分辨率
            canvas.width *= devicePixelRatio;
            canvas.height *= devicePixelRatio;

            if (ctx) {
                // 缩放绘图上下文以适应物理像素
                ctx.scale(devicePixelRatio, devicePixelRatio);
                const centerX = window.innerWidth / 2
                const centerY = window.innerHeight / 2
                drawCenterCircle(ctx, {x: centerX, y: centerY})
            }
        }
    }, [canvasRef.current])

    // ******** 操作 *********
    const getWindowCenter = (newWindow?: any) => {
        const centerX = (newWindow ? newWindow.width : window.innerWidth) / 2
        const centerY = (newWindow ? newWindow.height : window.innerHeight) / 2

        return {
            x: centerX,
            y: centerY,
            screenX: newWindow ? newWindow.screenX : window.screenX,
            screenY: newWindow ? newWindow.screenY : window.screenY
        }
    }

    const didWindowChange = ({
        newWindow,
        oldWindow,
    }: any) => {
        return newWindow.id === oldWindow.id
    }


    // ********* 渲染 ********
    // 绘制
    const drawCenterCircle = (ctx: CanvasRenderingContext2D, center: Coordinates) => {
        const { x, y } = center;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(x, y, 100, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    };

    // 首先改变基准使显示器具有坐标，并根据当前窗口screenX/screenY进行偏移。
    const baseChange = ({
        currentWindowOffset,
        targetWindowOffset,
        targetPosition,
    }: {
        currentWindowOffset: Coordinates;
        targetWindowOffset: Coordinates;
        targetPosition: Coordinates;
    }) => {
        const monitorCoordinate = {
            x: targetPosition.x + targetWindowOffset.x,
            y: targetPosition.y + targetWindowOffset.y,
        };
   
        const currentWindowCoordinate = {
            x: monitorCoordinate.x - currentWindowOffset.x,
            y: monitorCoordinate.y - currentWindowOffset.y,
        };
   
        return currentWindowCoordinate;
    };

    // 同一个相对坐标系上有两个点，可以画线了
    const drawConnectingLine = ({
        ctx,
        hostWindow,
        targetWindow,
    }: {
        ctx: CanvasRenderingContext2D;
        hostWindow: WindowState;
        targetWindow: WindowState;
    }) => {
        ctx.strokeStyle = "#ff0000";
        ctx.lineCap = "round";
        const currentWindowOffset: Coordinates = {
            x: hostWindow.screenX,
            y: hostWindow.screenY,
        };
        const targetWindowOffset: Coordinates = {
            x: targetWindow.screenX,
            y: targetWindow.screenY,
        };
   
        const origin = getWindowCenter(hostWindow);
        const target = getWindowCenter(targetWindow);
   
        const targetWithBaseChange = baseChange({
            currentWindowOffset,
            targetWindowOffset,
            targetPosition: target,
        });
   
        ctx.strokeStyle = "#ff0000";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(targetWithBaseChange.x, targetWithBaseChange.y);
        ctx.stroke();
        ctx.closePath();
    };

    return (
        <div className={styles.canvasBox}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                width={window.innerWidth}
                height={window.innerHeight}
            ></canvas>
        </div>
    )
}