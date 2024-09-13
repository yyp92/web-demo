/**
 * 输出节点
 */
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import {toggleAudio} from '../Audio'

export function OutputNode() {
    const [isRunning, setIsRuning] = useState(false)

    function handleToggleAudio() {
        setIsRuning(isRunning => !isRunning)
        toggleAudio()
    }

    return (
        <div
            style={{
                backgroundColor: '#fff',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.01), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                padding: '20px'
            }}
        >
            <Handle type="target" position={Position.Top} />

            <div>
                <p>输出节点</p>

                <button onClick={handleToggleAudio}>
                    {
                        isRunning
                            ? (
                                <span role="img">
                                    🔈
                                </span>
                            )
                            : (
                                <span role="img">
                                    🔇
                                </span>
                            )
                    }
                </button>
            </div>
        </div>
    )
}
