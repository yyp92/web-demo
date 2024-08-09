import React, { useEffect, useState, useRef } from 'react'
import c from 'classnames'
import { Button, Input, Select, Checkbox, Dropdown, Tooltip, message, Modal } from 'antd'
import { checkIsOverflowed } from '@/utils'

import styles from './index.module.scss'

interface SheetNameBtnProps {
    data: any
    handleSheetRename: (data: any, index: number) => void
    handleSheetDelete: (index: number) => void
    active: boolean
    handleActive: (index: number) => void
    index: number
    isEditIndex: number
    setIsEditIndex: React.Dispatch<React.SetStateAction<number>>
    disabledDeleteBtn: boolean

    [key: string]: any
}

const SheetNameBtn: React.FC<SheetNameBtnProps> = ({
    data,
    handleSheetRename,
    handleSheetDelete,
    index,
    active,
    handleActive,
    isEditIndex,
    setIsEditIndex,
    disabledDeleteBtn,
}) => {
    const [sheetName, setSheetName] = useState<string>('')
    const [activeSheet, setActiveSheet] = useState<boolean>(false)
    // 是否出现省略号
    const [isOverflow, setIsOverflow] = useState<boolean>(false)
    const order = useRef<number>(0)
    const sheetData = useRef<any>({})
    const wraperRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<any>(null);

    // 实现鼠标单双击区分
    // 记录点击次数，设置定时器
    const [clickCount, setClickCount] = useState<number>(0);
    const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const { name } = data ?? {}
        order.current = index
        sheetData.current = data

        setSheetName(name)
        setActiveSheet(active)
    }, [data, active])

    useEffect(() => {
        if (!!inputRef.current) {
            inputRef.current?.focus()
        }
    }, [isEditIndex])

    // 判断是否出现省略号
    useEffect(() => {
        const isOverflowed = checkIsOverflowed(wraperRef?.current, 32)
        setIsOverflow(isOverflowed)
    }, [wraperRef?.current, isEditIndex]);


    // *********　操作 *********　
    const handleChangeInput = (e: any) => {
        setSheetName(e?.target?.value)
    }

    const handleOnblur = () => {
        if (!!sheetName) {
            setIsEditIndex(-1)

            handleSheetRename({
                ...sheetData.current,
                name: sheetName
            }, order.current)
        }
        else {
            message.error('sheet名不得为空')
        }
    }

    const handleRename = (e?: any) => {
        setIsEditIndex(order.current)
    }

    const handleDelete = (e: any) => {
        if (disabledDeleteBtn) {
            return
        }

        handleSheetDelete(order.current)
    }

    const handleClick = () => {
        setClickCount(prevCount => prevCount + 1);

        if (clickCount === 0) {
            // 第一次点击，启动定时器
            clickTimerRef.current = setTimeout(() => {
                // 处理单击逻辑
                handleActive(order.current)

                // 注意这里要重置
                setClickCount(0);
                // 设置一个延迟时间，以便在延迟期间内判断单击还是双击
            }, 200);
        } else if (clickCount === 1) {
            // 第二次点击，清除定时器
            if (clickTimerRef.current) {
                clearTimeout(clickTimerRef.current);
                clickTimerRef.current = null;
            }

            // 处理双击事件的逻辑
            handleRename()

            // 重置点击次数
            setClickCount(0);
        }
    }


    // *********　渲染 *********　
    // menu
    const items: any[] = [
        {
            key: 'rename',
            label: (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={handleRename}
                >{'重命名'}</div>
            ),
        },
        {
            key: 'delete',
            disabled: disabledDeleteBtn,
            label: (
                <div
                    style={{ cursor: !disabledDeleteBtn ? 'pointer' : 'not-allowed' }}
                    onClick={handleDelete}
                >{'删除'}</div>
            ),
        },
    ];

    // 输入框双击全选
    const handleDoubleClick = (e: any) => {
        e.target.select();
    };


    return (
        <Dropdown
            menu={{ items }}
            trigger={['contextMenu']}
            // trigger={['click']}
        >
            <div
                className={c(
                    styles.sheetNameItem,
                    {
                        [styles.sheetNameItemActive]: activeSheet,
                        [styles.sheetNameItemEdit]: isEditIndex === order.current,
                    }
                )}
                onClick={handleClick}
                ref={wraperRef}
            >
                {
                    isEditIndex === order.current
                        ? <Input
                            style={{ width: '68px', height: 20, border: 'none', boxShadow: 'none', borderRadius: 0 }}
                            ref={inputRef}
                            value={sheetName}
                            onChange={handleChangeInput}
                            onBlur={handleOnblur}
                            onPressEnter={handleOnblur}
                            onClick={(e: any) => { e.stopPropagation() }}
                            spellCheck={false}
                            onDoubleClick={handleDoubleClick}
                        />
                        : !isOverflow
                            ? <div style={{ userSelect: 'none' }}>{sheetName}</div>
                            : <Tooltip title={sheetName}>
                                <div style={{ userSelect: 'none' }}>{sheetName}</div>
                            </Tooltip>
                }
            </div>
        </Dropdown>
    )
}

export default SheetNameBtn