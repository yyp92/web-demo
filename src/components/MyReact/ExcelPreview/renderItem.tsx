import React, {FC, useState, useRef, useCallback} from 'react'
import { Tooltip } from 'antd'
import dayjs from 'dayjs'
import c from 'classnames'
import Input from './input'

import styles from './index.module.scss'

interface RenderItemProps {
    record: any
    index: number
    group: any
    selectList: any
    setTableData: React.Dispatch<React.SetStateAction<any[]>>
    tableDataOrigin: any
}

const RenderItem: FC<RenderItemProps> = ({
    record,
    index,
    group,
    selectList,
    setTableData,
    tableDataOrigin
}) => {
    const [active, setActive] = useState<boolean>(false)

    const hanldeBlur = (value: any) => {
        const newList = [...tableDataOrigin.current]
        const newSelect: any[] = [...selectList.current]

        newList[index] = {
            ...record,
            [group?.itemId]: value
        }

        const findIndex = newSelect.findIndex((item: any) => item?.userId === record?.userId)
        if (findIndex > -1) {
            newSelect[findIndex] = {
                ...newSelect[findIndex],
                ...newList[index]
            }
        }
        else {
            newSelect.push(newList[index])
        }

        setTableData(newList)
        tableDataOrigin.current = newList
        selectList.current = [...newSelect]
        setActive(false)
    }

    const renderTableCell = (text: any, header: any, record: any) => {
        const {
            lableMsg,
            itemName,
            itemId,
            editable
        } = header ?? {}
        const {
            userId,
            compellation,
            salaryDataDetail
        } = record ?? {}

        const renderTitle = () => {
            if (!salaryDataDetail[itemId]) {
                return lableMsg
            }

            return (
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                    <div
                        style={{
                            marginRight: '10px',
                        }}
                    >
                        {lableMsg}

                        <span
                            style={{
                                color: '#3591F4',
                                cursor: 'pointer',
                                marginLeft: '6px'
                                // flexShrink: 0
                            }}
                            onClick={() => {
                                console.log('---查看明细')
                            }}
                        >
                            查看明细
                        </span>
                    </div>
                </div>
            )
        }

        return (
            <Tooltip
                title={renderTitle()}
                placement="bottom"
                mouseEnterDelay={0.7}
                // trigger='click'
                overlayClassName={styles.tooltipBox}
                // getPopupContainer={(triggerNode: any) => triggerNode}
            >
                {
                    itemId === 'last-col'
                        ? <div className={styles.minWidth}></div>
                        : (
                            <div>
                                {
                                    group?.editable && active
                                        ? (
                                            <Input
                                                value={record?.[group?.itemId]}
                                                hanldeBlur={hanldeBlur}
                                                isLast={index === tableDataOrigin.current.length - 1}
                                                placeholder="请输入数字"
                                            />
                                        )
                                        : (
                                            <div
                                                className={c(
                                                    styles.contentItem,
                                                    {
                                                        [styles.contentItemDisabled]: !editable
                                                    }
                                                )}
                                                onDoubleClick={() => {
                                                    setActive(true)
                                                }}
                                            >
                                                {text}
                                            </div> 
                                        )
                                }

                                {/* 计算撑开高度 */}
                                <div
                                    style={{
                                        padding: '10px 16px',
                                        background: 'transparent',
                                        color: 'transparent'
                                    }}
                                >{text}</div>
                            </div>
                        )
                }
                
            </Tooltip>
        )
    }

    const renderContent = () => {
        return renderTableCell(record?.[group?.itemId], group, record)
    }

    return renderContent()
}

export default RenderItem
