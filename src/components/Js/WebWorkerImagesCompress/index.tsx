import {useEffect, useState} from 'react'
import { Button } from 'antd'
import ComporessWorker from './compress.worker?worker';


const allImgNum = 100;
const url = 'https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c';


export const WebWorkerImagesCompress = () => {
    const [showTime, setShowTime] = useState<number>(Date.now())

    useEffect(() => {
        updateShowTime();
    }, []);   


    // ********* 操作 *********
    const updateShowTime = () => {
        setShowTime(Date.now());
        requestAnimationFrame(updateShowTime);
    };

    const compressImg = (img: any) => {
        const canvas = document.createElement('canvas');
        const ctx: any = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL('image/jpeg', 0.75);
    }

    // 主线程压缩
    const mainCompressImg = async () => {
        const res = await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.setAttribute('crossOrigin', 'Anonymous');
            img.onload = () => {
                resolve(img);
            };
            img.onerror = (e) => {
                reject(e);
            };
        });

        console.time('compress');
        for (let i = 0; i < allImgNum; i++) {
            const compressRes = compressImg(res);
            // console.log(compressRes);
        }
        console.timeEnd('compress');

        return res;
    }

    // 子线程压缩
    const workerCompressImg = async () => {
        const res = await fetch(url).then((res) => res.blob());
        const workerList: any[][] = [[], [], [], [], []];

        for (let i = 0; i < allImgNum / 5; i++) {
            workerList[0].push(res);
            workerList[1].push(res);
            workerList[2].push(res);
            workerList[3].push(res);
            workerList[4].push(res);
        }
    
        console.time('compressWorker');

        const pList = [];
        for (let item of workerList) {
            const compressP = new Promise((resolve, reject) => {
                const myWorker = new ComporessWorker();

                myWorker.postMessage({
                    imageList: item,
                });

                myWorker.onmessage = (e) => {
                    resolve(e.data.data);
                };
            });
            
            pList.push(compressP);
        }
    
        const pRes = await Promise.all(pList);
        console.log(pRes);
        console.timeEnd('compressWorker');
}


    // ********* 渲染 *********
    return (
        <div>
            <h2>WebWorker 应用场景 图片压缩</h2>

            <div style={{marginTop: 20}}>
                <Button
                    style={{marginRight: 10}}
                    type="primary"
                    onClick={mainCompressImg}
                >压缩图片</Button>

                <Button
                    style={{marginRight: 10}}
                    type="primary"
                    onClick={workerCompressImg}
                >worker压缩图片</Button>

                <span>{showTime}</span>
            </div>
        </div>
    )
}