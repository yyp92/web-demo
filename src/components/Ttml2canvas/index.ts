// ! 前端dom元素生成图片
// http://html2canvas.hertzen.com/
// http://caibaojian.com/html2canvas.html

import html2canvas from 'html2canvas'

// 前端 dom --> 图片
const generateShareImage = (id: string, previewBoxId?: string) => {
  // 创建画布
  const canvas = document.createElement("canvas")
  let canvasBox = document.getElementById(id)!
  const width = canvasBox?.offsetWidth!
  const height = canvasBox?.offsetHeight!
  canvas.width = width * 2
  canvas.height = height * 2
  
  // 生成页面模糊时，可以放大一定倍数，通过调整canvas的宽高使其清晰度增加
  const context = canvas.getContext("2d")!;

  // ! 生成的图片有黑边
  // 使用到了canvas.getContext("2d").scale()方法，配合html2canvas插件使用，最后生成的图片却有黑边，一看就知道是画布偏离了
  // 使用canvas.getContext("2d").translate()方法，将canvas的画布移到正确的位置上去
  context.scale(2, 2);
  context.translate(0, 0)
  
  // 参数
  const options = {
      backgroundColor: '#fff',
      canvas: canvas,
      useCORS: true
  };


  // 下载图片
  const downloadImage = (url: string) => {
    // 创建一个超链接对象实例
    let link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "截图.png");
    link.click();
  }

  html2canvas(canvasBox, options).then((canvas) => {
    let dataURL = canvas.toDataURL("image/png");
    // 下载
    downloadImage(dataURL);

    if (previewBoxId) {
      // 显示
      const share: any = document.getElementById(previewBoxId);
      const img = document.createElement("img")
      img.src = dataURL;
      img.style.width = '100%'
      img.style.height = '100%'
      share.appendChild(img)
    }
  }) 
}

export default generateShareImage