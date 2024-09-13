/**
 * 创建振荡器的自定义节点
 */
import { Handle, Position } from '@xyflow/react';
import { ChangeEventHandler, useState } from 'react';
import { updateAudioNode } from '../Audio';

export interface OscillatorNodeProps {
    id: string
    data: {
        frequency: number
        type: string
    }
}

export function OscillatorNode({
    id,
    data
}: OscillatorNodeProps) {
    const [frequency, setFrequency] = useState(data.frequency)
    const [type, setType] = useState(data.type)

    const changeFrequency: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFrequency(+e.target.value)
        updateAudioNode(id, {
            frequency: +e.target.value
        })
    }

    const changeType: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setType(e.target.value)
        updateAudioNode(id, {
            type: e.target.value
        })
    }

    return (
        <div
            style={{
                backgroundColor: '#fff',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
        >
            <p
                style={{
                    borderTopLeftRadius: '0.375rem',
                    borderTopRightRadius: '0.375rem',
                    padding: '8px',
                    backgroundColor: '#ec4899',
                    color: '#fff'
                }}
            >振荡器节点</p>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '8px'
                }}
            >
                <span>频率</span>

                <input
                    className='nodrag'
                    type="range"
                    min="10"
                    max="1000"
                    value={frequency}
                    onChange={changeFrequency}
                />

                <span style={{textAlign: 'right'}}>{frequency}赫兹</span>
            </div>

            <hr
                style={{
                    margin: '0 4px'
                }}
            />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '8px'
                }}
            >
                <p>波形</p>

                <select
                    value={type}
                    onChange={changeType}
                >
                    <option value="sine">正弦波</option>
                    <option value="triangle">三角波</option>
                    <option value="sawtooth">锯齿波</option>
                    <option value="square">方波</option>
                </select>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
