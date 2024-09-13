/**
 * 第二种自定义节点
 */
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { updateAudioNode } from '../Audio';


export interface VolumeNodeProps {
    id: string
    data: {
        gain: number
    }
}

export function VolumeNode({
    id,
    data
}: VolumeNodeProps) {
    const [gain, setGain] = useState(data.gain)

    const changeGain: ChangeEventHandler<HTMLInputElement> = (e) => {
        setGain(+e.target.value)
        updateAudioNode(id, {
            gain: +e.target.value
        })
    }

    return (
        <div
            style={{
                borderRadius: '0.375rem',
                backgroundColor: '#fff',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
        >
            <Handle
                style={{
                    width: '10px',
                    height: '10px'
                }}
                type="target"
                position={Position.Top}
            />

            <p
                style={{
                    borderTopLeftRadius: '0.375rem',
                    borderTopRightRadius: '0.375rem',
                    padding: '4px',
                    backgroundColor: '#3b82f6',
                    color: '#fff'
                }}
            >音量节点</p>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '4px'
                }}
            >
                <p>Gain</p>

                <input
                    // 不加的话拖动进度条就变成了拖动节点
                    // 这个是 react flow 提供的用于禁止拖动的 className
                    className="nodrag"

                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={gain}
                    onChange={changeGain}
                />

                <p style={{textAlign: 'right'}}>{gain.toFixed(2)}</p>
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
            />
        </div>
    )
}
