import { useEffect } from "react";

// onmessage事件
self.onmessage = async function(e: any) {
    const {
        data: { imageList },
    } = e;

    const resList = [];

    for (let img of imageList) {
        // @ts-ignore
        // OffscreenCanvas 是 HTML5 新增的一个特性，它允许你在 Web Workers 中创建和操作 Canvas 对象，从而在后台线程中处理图形渲染和处理，以提高性能和响应性。
        const offscreen = new OffscreenCanvas(100, 100);
        const ctx: any = offscreen.getContext('2d');

        // * createImageBitmap 是一个用于创建 ImageBitmap 对象的 JavaScript 方法。ImageBitmap 对象代表了可以被绘制到画布上的图像位图。
        const imgData = await createImageBitmap(img);

        offscreen.width = imgData.width;
        offscreen.height = imgData.height;
        ctx.drawImage(imgData, 0, 0, offscreen.width, offscreen.height);

        const res = await offscreen
            .convertToBlob({ type: 'image/jpeg', quality: 0.75 })
            .then((blob) => {
                // FileReader 是一个内置的 JavaScript 对象，用于在客户端（浏览器）中异步读取文件内容。通过 FileReader 对象，你可以读取本地文件的内容，并且可以将文件内容以文本或数据 URL 的形式进行处理。
                const reader = new FileReader();
                reader.readAsDataURL(blob);

                return new Promise((resolve) => {
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                });
            });

        resList.push(res);
    }

    self.postMessage({
        data: resList,
        name: 'worker test',
    });
    self.close();
};