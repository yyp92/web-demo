import {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    MiniMap,
    Node,
    OnConnect,
    Panel,
    ReactFlow,
    useEdgesState,
    useNodesState
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { OscillatorNode } from './components/OscillatorNode'
import { VolumeNode } from './components/VolumeNode'
import { OutputNode } from './components/OutputNode'
import { connect, createAudioNode, disconnect, removeAudioNode } from './Audio'

const initialNodes: Node[] = [
    {
        id: 'a',
        type: 'osc',
        position: {
            x: 200,
            y: 0
        },
        data: {
            frequency: 220,
            type: 'square'
        },

    },
    {
        id: 'b',
        type: 'volume',
        position: {
            x: 150,
            y: 250
        },
        data: {
            gain: 0.5
        },
    },
    {
        id: 'c',
        type: 'out',
        position: {
            x: 350,
            y: 400
        },
        data: {},
    },
]
const initialEdges: Edge[] = []
// const initialEdges = [
//     {
//         id: 'e1-2',
//         source: '1',
//         target: '2'
//     },
//     {
//         id: 'e2-3',
//         source: '2',
//         target: '3'
//     },
// ]

const nodeTypes = {
    'osc': OscillatorNode,
    'volume': VolumeNode,
    'out': OutputNode
}

export const AudioFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = (params: Connection) => {
        connect(params.source, params.target)
        setEdges((eds) => addEdge(params, eds))
    }

    // 添加振荡器节点
    function addOscNode() {
        const id = Math.random().toString().slice(2, 8)
        const position = {
            x: 0,
            y: 0
        }
        const type = 'osc'
        const data = {
            frequency: 400,
            type: 'sine'
        }

        setNodes([
            ...nodes,
            {
                id,
                type,
                data,
                position
            }
        ])
        createAudioNode(id, type, data)
    }

    // 添加音量节点
    function addVolumeNode() {
        const id = Math.random().toString().slice(2, 8)
        const data = {
            gain: 0.5
        }
        const position = {
            x: 0,
            y: 0
        }
        const type = 'volume'

        setNodes([
            ...nodes,
            {
                id,
                type,
                data,
                position
            }
        ])
        createAudioNode(id, type, data)
    }


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                fitView
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}

                // 节点删除对应 removeAudioNode
                onNodesDelete={(nodes) => {
                    for (const { id } of nodes) {
                        removeAudioNode(id)
                    }
                }}

                // 边删除对应 disconnect
                onEdgesDelete={(edges) => {
                    for (const item of edges) {
                        const {
                            source,
                            target
                        } = item
                        disconnect(source, target)
                    }
                }}
            >
                <Controls />

                <MiniMap />

                <Background variant={BackgroundVariant.Lines} />

                <Panel
                    style={{marginLeft: '1rem'}}
                    position="top-right"
                >
                    <button
                        style={{
                            padding: '4px',
                            borderRadius: '0.25rem',
                            backgroundColor: '#fff',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                        }}
                        onClick={addOscNode}
                    >添加振荡器节点</button>

                    <button
                        style={{
                            padding: '4px',
                            borderRadius: '0.25rem',
                            backgroundColor: '#fff',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                        }}
                        onClick={addVolumeNode}
                    >添加音量节点</button>
                </Panel>
            </ReactFlow>
        </div>
    )
}
