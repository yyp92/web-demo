/**
 * 本地存储方案
 * 
 * localForage 有一个优雅降级策略，若浏览器不支持 IndexedDB 或 WebSQL，则使用 localStorage。在所有主流浏览器中都可用：Chrome，Firefox，IE 和 Safari（包括 Safari Mobile）。下面是 indexDB、web sql、localStorage 的一个浏览器支持情况，可以发现，兼容性方面loaclForage基本上满足99%需求
 */
import {useState} from 'react'
import localforage from "localforage"
import {Button, Input} from 'antd'

export const LocalForage = () => {
    const [inputValue, setInputValue] = useState<string>('')


    // ***************** 操作 *****************
    /**
     * 获取存储
     */
    const handleGetItem = (key: string) => {
        localforage
            .getItem(key)
            .then((value) => {
                // 当离线仓库中的值被载入时，此处代码运行
                console.log(value);
            })
            .catch((err) => {
                // 当出错时，此处代码运行
                console.log(err);
            });
    }

    /**
     * 设置存储
     * 
     * 可以存储的值
     * Array
     * ArrayBuffer
     * Blob
     * Float32Array
     * Float64Array
     * Int8Array
     * Int16Array
     * Int32Array
     * Number
     * Object
     * Uint8Array
     * Uint8ClampedArray
     * Uint16Array
     * Uint32Array
     * String
     */
    const handleSetItem = (key: string, data: any, callback: Function = () => {}) => {
        localforage
            .setItem(key, data)
            .then((value) => {
                // 当值被存储后，可执行其他操作
                console.log(value);
            })
            .catch((err) => {
                // 当出错时，此处代码运行
                console.log(err);
            });
    }

    /**
     * 删除存储
     */
    const handleRemoveItem = (key: string, successCallback: Function = () => {}) => {
        localforage
            .removeItem(key)
            .then(function() {
                // 当值被移除后，此处代码运行
                console.log('Key is cleared!');
            })
            .catch(function(err) {
                // 当出错时，此处代码运行
                console.log(err);
            });
    }

    /**
     * 清空存储
     */
    const handleClear = (successCallback: Function = () => {}) => {
        localforage
            .clear()
            .then(() => {
                // 当数据库被全部删除后，此处代码运行
                console.log('Database is now empty.');
            })
            .catch((err) => {
                // 当出错时，此处代码运行
                console.log(err);
            });
    }

    
    // ***************** 渲染 *****************
    return (
        <div>
            <div style={{marginBottom: '20px'}}>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </div>

            <div>
                <Button
                    style={{marginRight: '12px'}}
                    type="primary"
                    onClick={() => handleGetItem('data')}
                >获取存储</Button>

                <Button
                    style={{marginRight: '12px'}}
                    type="primary"
                    onClick={() => handleSetItem('data', inputValue)}
                >设置存储</Button>

                <Button
                    style={{marginRight: '12px'}}
                    type="primary"
                    onClick={() => handleRemoveItem('data')}
                >删除存储</Button>

                <Button
                    style={{marginRight: '12px'}}
                    type="primary"
                    onClick={() => handleClear()}
                >清空存储</Button>
            </div>
            
        </div>
    )
}
