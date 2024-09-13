import {
    addEdge,
    Background,
    BackgroundVariant,
    BaseEdge,
    Connection,
    Controls,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    getStraightPath,
    Handle,
    MiniMap,
    Panel,
    Position,
    ReactFlow as ReactFlowPage,
    useEdgesState,
    useNodesState,
    useReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes = [
    {
        id: '1',
        position: {
            x: 0,
            y: 0
        },
        type: 'red',
        data: {
            label: '1'
        }
    },
    {
        id: '2',
        position: {
            x: 0,
            y: 100
        },
        type: 'blue',
        data: {
            label: '2'
        }
    },
]
const initialEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'custom'
    }
]

interface NodePorps {
    data: {
        label: string
    }
}

/**
 * * 在自定义节点里
 * 用 Handle 来指定黑点出现的位置。
 * 还要指定 type，可以连线从 source 的 Handle 到 type 为 target 的 Handle，不能反过来。
 */
function RedNode({ data }: NodePorps) {
    return (
        <div
            style={{
                background: 'red',
                width: '100px',
                height: '100px',
                textAlign: 'center'
            }}
        >
            <Handle
                type="source"
                position={Position.Right}
            />

            <Handle
                type="target"
                position={Position.Bottom}
            />


            <div>{data.label}</div>
        </div>
    )
}

function BlueNode({ data }: NodePorps) {
    return (
        <div
            style={{
                background: 'blue',
                width: '50px',
                height: '50px',
                textAlign: 'center',
                color: '#fff'
            }}
        >
            <Handle
                type="source"
                position={Position.Bottom}
            />

            <Handle
                type="target"
                position={Position.Top}
            />

            <div>{data.label}</div>
        </div>
    )
}

function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {
    const { setEdges } = useReactFlow()

    // * 绘制贝塞尔曲线
    // const [edgePath, labelX, labelY] = getBezierPath({
    //     sourceX,
    //     sourceY,
    //     sourcePosition,
    //     targetX,
    //     targetY,
    //     targetPosition,
    // })

    // * 绘制直线
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY
    })

    const onEdgeClick = () => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id))
    }

    return (
        <>
            {/* 通过 BaseEdge 来画线 */}
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={style}
            />

            {/* 通过 EdgeLabelRenderer 来画其他内容 */}
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // EdgeLabelRenderer 里的组件默认不处理鼠标事件，如果要处理就要声明 pointerEvents: all
                        pointerEvents: 'all',
                    }}
                >
                    <button onClick={onEdgeClick}>
                        ×
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    )
}

export const ReactFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = (params: Connection) => {
        setEdges((eds) => addEdge(params, eds))
    }

    return (
        <div
            style={{
                width: '800px',
                height: '500px',
                border: '1px solid #000',
                margin: '50px auto'
            }}
        >
            <ReactFlowPage
                // node（节点）
                nodes={nodes}

                // edge（边）
                edges={edges}

                //  nodesChange（节点变化）
                onNodesChange={onNodesChange}

                // edgesChange（边变化）
                onEdgesChange={onEdgesChange}

                // connect（连接节点和节点）
                onConnect={onConnect}

                // nodeTypes 来指定 type 和组件的映射
                nodeTypes={{
                    red: RedNode,
                    blue: BlueNode
                }}

                // 边也可以自定义，通过 edgeTypes 来指定映射。
                edgeTypes={{
                    custom: CustomEdge
                }}          
            >
                {/* 控制条 */}
                <Controls />

                {/* 缩略图 */}
                <MiniMap zoomable />

                {/* 背景 */}
                <Background variant={BackgroundVariant.Lines} />

                {/* 通过 Panel 组件在画布上放置一些按钮之类的 */}
                <Panel position="top-right">
                    <button onClick={() => {
                        setNodes([
                            ...nodes,
                            { 
                                id: Math.random().toString().slice(2, 6) + '', 
                                type: 'red', 
                                position: {
                                    x: 0,
                                    y: 0
                                }, 
                                data: {
                                    label: '光'
                                }
                            }
                        ])
                    }}>添加节点</button>
                </Panel>
            </ReactFlowPage>
        </div>
    )
}
