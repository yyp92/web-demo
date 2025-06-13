import React, { forwardRef, useState, useRef, useEffect } from "react";
import c from 'classnames'
import { ReactSortable } from "react-sortablejs";
// import Overflow from '@/newComponents/overflow'
import {throttle} from 'lodash'

import styles from './index.module.scss'

interface ReactSortableCompProps {
    list: any[]
    setList: React.Dispatch<React.SetStateAction<any[]>>
    handleDeleteSelectedItem: (data: any) => void
}

const CustomComponent = forwardRef<HTMLDivElement, any>((props, ref) => {

    return (
        <div
            className={styles.customComponent}
            style={{
                marginTop: '6px'
            }}
            ref={ref}
        >
            {props.children}
        </div>
    );
});

const ReactSortableComp: React.FC<ReactSortableCompProps> = ({
    list = [],
    setList,
    handleDeleteSelectedItem,
}) => {
    const [isMove, setIsMove] = useState<boolean>(false)

    return (
        <ReactSortable
            // expand={true}
            tag={CustomComponent}
            list={list}
            setList={setList}
            onMove={throttle(() => {
                setIsMove(true)

                return true
            }, 80)}
            onEnd={() => {
                setTimeout(() => {
                    setIsMove(false)
                }, 150)
            }}
        >
            {list.map((item: any) => (
                <div
                    className={c(
                        styles.item,
                        {
                            [styles.itemDisabled]: !!item?.system
                        }
                    )}
                    key={item.itemId}
                >
                    <div>
                        {/* <Overflow
                            text={item.itemName}
                            width={98}
                            ellipsisWidth={84}
                            isMove={isMove}
                        /> */}
                        {item.itemName}
                    </div>

                    {
                        !item?.system && (
                            <span
                                className="iconfont icon_guanbi"
                                style={{
                                    fontSize: '10px',
                                    height: '18px',
                                    cursor: 'pointer',
                                    marginLeft: '4px'
                                }}
                                onClick={() => handleDeleteSelectedItem(item)}
                            ></span>
                        )
                    }
                </div>
            ))}
        </ReactSortable>
    );
};


export default ReactSortableComp
