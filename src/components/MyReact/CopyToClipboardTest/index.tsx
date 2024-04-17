/**
 * CopyToClipboardTest
 */
import React from 'react'
import copy from 'copy-to-clipboard'
// import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopyToClipboard from '../components/CopyToClipboard'

// 直接使用 copy-to-clipboard 包
export const CopyToClipboardTest1 = () => {
    function onClick() {
        const res = copy('复制666')
        console.log('done', res);
    }
    
    return <div onClick={onClick}>复制</div>
}

// 直接使用 react-copy-to-clipboard 包
export const CopyToClipboardTest = () => {
    return (
        <CopyToClipboard
            text={'复制2'}
            onCopy={() => {
                console.log('done')
            }}
        >
            <div onClick={() => alert(1)}>复制</div>
        </CopyToClipboard>
      )
}