import React, {useEffect, useState} from 'react'
import c from 'classnames'
import {Input as AntdInput} from 'antd'
import styles from './index.module.scss'

const Input: React.FC<any> = ({
    value,
    hanldeBlur = () => {},
    isLast = false,
    placeholder,
}) => {
    const [inputVal, setInputVal] = useState<any>(value)

    const handleOnblur = () => {
        let newValue = inputVal?.endsWith('.')
            ? inputVal + '0'
            : inputVal

        if (newValue === '-') {
            newValue = ''
        }

        hanldeBlur(newValue)
    }

    return (
        <div
            className={c(
                styles.tableInputWraper,
                {
                    [styles.tableInputWraperLast]: isLast
                }
            )}
        >
            <AntdInput
                value={inputVal}
                onChange={(e: any) => {
                    // 不能超过16位整数，10位小数
                    const regex = /^-?\d{0,16}(\.\d{0,10})?$/

                    if (!regex.test(e.target.value)) {
                        return
                    }

                    setInputVal(e.target.value)
                }}
                onBlur={handleOnblur}
                autoFocus={true}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input
