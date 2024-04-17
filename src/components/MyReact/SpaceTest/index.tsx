import React from 'react'
import Space from '../components/Space'
import { ConfigContext, ConfigProvider } from '../components/Space/ConfigProvider';

import styles from './index.module.scss'

export function SpaceTest() {
    return (
        <div>
            <ConfigProvider space={{ size: 20 }}>
                <Space direction="horizontal">
                    <div className={styles.box}></div>
                    <div className={styles.box}></div>
                    <div className={styles.box}></div>
                </Space>

                <Space direction="vertical">
                    <div className={styles.box}></div>
                    <div className={styles.box}></div>
                    <div className={styles.box}></div>
                </Space>
            </ConfigProvider>
        </div>
    )
}