// * 获取url参数
export const getUrlParams = (url: string = '') => {
    const params: any = {}

    // 判断是否有参数
    const index = url.indexOf('?')

    if (index !== -1) {
        const str = url.substring(index + 1);
        const strs = str.split('&');

        if (Array.isArray(strs)) {
            strs.forEach((item) => {
                const list = item.split('=')

                if (list?.length >= 1) {
                    params[list[0]] = list?.[1]
                }
            })
        }
    }

    return params
}

/**
 * * 判断是否文本出现省略号
 */
// export const checkIsOverflowed = (ref: any, width: number = 0) => {
//     const element = ref
//     const tempDiv = document.createElement('div')
//     tempDiv.style.position = 'absolute'
//     tempDiv.style.top = '9999px'

//     tempDiv.textContent = element.textContent
//     document.body.appendChild(tempDiv)

//     const isOverflowed = tempDiv.clientWidth > width

//     document.body.removeChild(tempDiv)

//     return isOverflowed
// }
export const checkIsOverflowed = (ref: any, width: number = 0) => {
    const element = ref
  
    if (element) {
      const tempDiv = document.createElement('div')
      tempDiv.style.position = 'absolute'
      tempDiv.style.top = '-9999px'
  
      tempDiv.textContent = element.textContent
      document.body.appendChild(tempDiv)
  
        const isOverflowed = tempDiv.clientWidth > (element?.clientWidth - width)
  
        document.body.removeChild(tempDiv)
  
        return isOverflowed
    }
  
      return false
  }

/**
 * * 根据内容计算宽度
 */
export const calculateWidth = (title: string, minWidth: number = 88) => {
    // 创建一个临时的 DOM 元素
    const tempElement = document.createElement('span');
    // 将标题内容设置到临时元素中
    tempElement.textContent = title;
    // 设置样式以便测量宽度
    tempElement.style.display = 'inline-block';
    tempElement.style.visibility = 'hidden';
    tempElement.style.whiteSpace = 'nowrap';
    // 将临时元素添加到文档中
    document.body.appendChild(tempElement);
    // 获取计算后的宽度
    const width = tempElement.offsetWidth;
    // 移除临时元素
    document.body.removeChild(tempElement);

    const newWidth = width + 32

    // 返回计算后的宽度
    // 最小宽度为88px
    return newWidth > minWidth ? newWidth : minWidth
}


/**
 * * 下载文件
 * @param url 路径 
 * @param downloadFileName 文件名
 * @param handleCancel 回调
 */
export const downloadFile = (
    output: any,
    downloadFileName = '未命名文件',
    handleCancel?: any
) => {
    if (!output) {
        handleCancel && handleCancel()
        return
    }

    fetch(output, { responseType: 'blob' } as any).then(res => res.blob()).then(res => {
        if ((window?.navigator as any)?.msSaveBlob) {
            const suffix = output.split('.').pop();
            downloadFileName = downloadFileName === '未命名文件'
                ? downloadFileName + '.' + suffix
                : downloadFileName;

            try {
                (window?.navigator as any)?.msSaveBlob(res, downloadFileName);
                handleCancel && handleCancel()
            }
            catch (e) {
                handleCancel && handleCancel()
            }
        }
        else {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res);
            link.download = downloadFileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            handleCancel && handleCancel()
        }
    }).catch(e => {
        // console.error(e)
        // handleCancel()
    })
}


/**
 * * 生成序列字母头
 * @param count
 */
const sequenceCharCode = (count: number): Array<string> => {
    let charList: Array<any> = []

    for (var i = 0; i < count; i++) {
        let size = Math.floor(i / 26)
        let step = i % 26
        let sizeText = i > 25 ? String.fromCharCode(65 + size - 1) : ''
        let stepText = String.fromCharCode(65 + step)
        let showText = `${sizeText}${stepText}`

        charList.push(showText)
    }

    return charList
}
