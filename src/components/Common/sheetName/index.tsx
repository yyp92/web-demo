import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Checkbox, message, Modal } from 'antd'
import { calculateWidth } from '@/utils'
import { cloneDeep } from 'lodash'
import SheetNameBtn from './sheetNameBtn'
import c from 'classnames'

import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'


interface SheetAllListProps {
    name: string
    fieldsList: any[]
}

const defaultSheetItemData = {
    name: 'Sheet1',
    fieldsList: [
        // {
        //     title: '点击设置表头',
        //     dataIndex: 'my-default',
        // },
        // {
        //     title: '',
        //     dataIndex: 'my-default-last',
        // }
    ]
}

const SheetName = () => {
    const [modal, contextHolder] = Modal.useModal()

    const sheetContentRef = useRef<HTMLDivElement>(null)
    const [isEditIndex, setIsEditIndex] = useState<number>(-1)
    const [active, setActive] = useState<number>(0)

    // 激活的tshee表的表头
    const [newColumns, setNewColumns] = useState<any[]>([])
    // 所有的 sheet 表数据
    const [sheetAllList, setSheetAllList] = useState<SheetAllListProps[]>([])
    const sheetNameSuffixIndex = useRef<number>(1)

    // 删除sheet
    const [openDeleteSheet, setOpenDeleteSheet] = useState<boolean>(false)
    const handleSheetDeleteRef = useRef<number>(0)

    useEffect(() => {
        const initData = cloneDeep(defaultSheetItemData)
        
        setSheetAllList([initData])
        setNewColumns(initData?.fieldsList)
    }, [])


    // ********* 操作 *********
    // 重命名自动拼接数字
    const renameWithAutoNumber = (originalName: string) => {
        let existingNames: any = [...sheetAllList]
        existingNames = existingNames.map((item: any) => item?.name)
        let newName = originalName
        let count = 1

        while (existingNames.includes(newName)) {
            newName = `${originalName}${count}`
            count++
        }

        return newName
    }

    const handleSheetActive = (index: number) => {
        const list = [...sheetAllList]
        setActive(index)

        setNewColumns([...list[index]?.fieldsList])
    }

    const handleSheetRename = (data: any, index: number) => {
        const list = [...sheetAllList]

        // 如果重命名时，没有改变则用之前的名字
        const sheet = list[index]?.name === data?.name
            ? data?.name
            : renameWithAutoNumber(data?.name)

        list[index] = {
            ...data,
            name: sheet
        }

        setSheetAllList(list)
    }

    const handleSheetDelete = (index: number) => {
        handleSheetDeleteRef.current = index

        deleteConfirm()
    }

    const handleSheetDeleteConfirm = () => {
        const index = handleSheetDeleteRef.current
        const list = [...sheetAllList]
        list.splice(index, 1)

        setSheetAllList(list)
        setActive(index > 0 ? index - 1 : list.length - 1)
        setOpenDeleteSheet(false)
    }

    const deleteConfirm = () => {
        return modal.confirm({
            title: 'Confirm',
            content: '确认删除？',
            okText: '确认',
            cancelText: '取消',
            onOk: handleSheetDeleteConfirm
        })
    }

    const handleAddSheet = (e: any) => {
        if (isEditIndex > -1) {
            return
        }

        e.preventDefault()

        // sheetNameSuffixIndex.current = 0
        let maxNum = 0

        const newList = cloneDeep(sheetAllList)
        newList.forEach((item: any) => {
            if (item?.name?.startsWith?.('Sheet')) {
                // sheetNameSuffixIndex.current = Number(item?.name?.slice(5))
                maxNum = Math.max(maxNum, item?.name?.slice(5))
            }
        })


        const newData: any = cloneDeep(defaultSheetItemData)
        const newSheet = newData?.name?.slice(0, 5)

        if (maxNum === sheetNameSuffixIndex.current + 1) {
            sheetNameSuffixIndex.current = sheetNameSuffixIndex.current + 2
        }
        else {
            sheetNameSuffixIndex.current++
        }

        newData.name = `${newSheet}${sheetNameSuffixIndex.current}`

        // if (showOrder) {
        //     newData.fieldsList.unshift(order)
        // }

        newList.push(newData)
        setSheetAllList(newList)
    }


    // ********* 渲染 *********
    return (
        <div className={styles.sheetName}>
            <div
                className={styles.sheetNameContent}
                style={{
                    maxWidth: (sheetContentRef.current?.clientWidth ?? 0) - 66,
                    overflowX: 'auto'
                }}
            >
                {
                    sheetAllList.map((item: any, index: number) => {
                        return (
                            <SheetNameBtn
                                active={active === index}
                                handleActive={handleSheetActive}
                                index={index}
                                data={item}
                                key={`${item?.name}-${index}`}
                                handleSheetRename={handleSheetRename}
                                handleSheetDelete={handleSheetDelete}
                                isEditIndex={isEditIndex}
                                setIsEditIndex={setIsEditIndex}
                                disabledDeleteBtn={sheetAllList?.length === 1}
                            />
                        )
                    })
                }
            </div>

            <div className={c(
                styles.sheetAdd,
                {
                    [styles.sheetAddDisabled]: isEditIndex > -1
                }
            )}>
                <PlusOutlined
                    className="icon-add"
                    style={{
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                    onClick={handleAddSheet}
                />
            </div>

            {contextHolder}
        </div>
    )
}

export default SheetName