import {useEffect, useState, useCallback, FC} from 'react'
import {Button, Input, message} from 'antd'
import {
    setCallBackHandle,
    toSendMsg2All,
    toSendMsg2Others,
    toJoinRoom,
    toLeaveRoom,
    toTriggerCxtEventDemo,
    toConnect,
    toDisconnect
} from './socket'

import styles from './index.module.scss'

interface MessageObj {
    msg: string
    // source 为空就是我发的，放到右边
    source: string
}

interface MessageProps {
    msgObj: MessageObj
}

const Message: FC<MessageProps> = ({msgObj}) => {
    return (
        <li className={!msgObj.source ? styles.right : styles.left}>
            <span title={msgObj.source }>{msgObj.msg }</span>
        </li>
    )
}

interface MessagePostProps {
    data: Array<MessageObj>
}

const MessagePost: FC<MessagePostProps> = ({
    data
}) => {
    return (
        <ul className={styles.content}>
            {
                !!data?.length && data.map((msgObj, index) => {
                    return (
                        <Message key={index} msgObj={msgObj}  />
                    )
                })
            }
        </ul>
    )
}

interface callbackHandler {
    (msg: string, room?: string): void
}

export const SocketIO = () => {
    const [socket, setSocket] = useState<any>(null)
    const [clientMsgObjs, setClientMsgObjs] = useState<MessageObj[]>([])
    const [inputMsg, setInputMsg] = useState<string>('')
    const [inputRoom, setInputRoom] = useState<string>('')

    useEffect(() => {
        return () => {
            toDisconnect()
        }
    }, [])

    const onReceiveClientMsg = useCallback((msgObj: any) => {
        console.log('App.onReceiveClientMsg', msgObj)
        setClientMsgObjs([...clientMsgObjs, {...msgObj, source: msgObj.from}])
    }, [clientMsgObjs])

    const onConnectionChanged = (socket: any) => {
        setSocket({...socket})
    }

    useEffect(() => {
        setCallBackHandle('onReceiveClientMsg', onReceiveClientMsg)
        setCallBackHandle('onConnectionChanged', onConnectionChanged)
    }, [onReceiveClientMsg])


    // ********* 操作 **********
    const afterMsgSend = () => {
        setInputMsg('')
        setClientMsgObjs([...clientMsgObjs, {msg: inputMsg, source: ''}])
    }

    const handleClick = (cbHandler: callbackHandler) => {
        if (!!cbHandler) {
            cbHandler(inputMsg, inputRoom)
        }

        afterMsgSend()
    }

    const onMsgInputKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            toSendMsg2Others(inputMsg, inputRoom)
            afterMsgSend()
        }
    }


    // ********* 渲染 **********
    return (
        <div>
            <div className={styles.header}>
                <h4>Socket ID: {socket?.id}</h4>
            </div>

            <div className={styles.body}>
                <MessagePost data={clientMsgObjs} />

                <div className={styles.action}>
                    <Button
                        style={{marginBottom: 10}}
                        type="primary"
                        disabled={!!socket?.connected}
                        onClick={toConnect}
                    >Connect</Button>

                    <Button
                        style={{marginBottom: 10}}
                        type="primary"
                        disabled={!!socket?.disconnected}
                        onClick={toDisconnect}
                    >Disconnect</Button>

                    <Button
                        type="primary"
                        onClick={toTriggerCxtEventDemo}
                    >cxt-event-a</Button>    
                </div>
            </div>

            <div className={styles.footer}>
                <label>Message</label>

                <Input
                    autoFocus
                    value={inputMsg}
                    onChange={(e: any) => setInputMsg(e?.target?.value)}
                    onKeyDown={onMsgInputKeyDown}
                />

                <Button
                    type="primary"
                    onClick={() => handleClick(toSendMsg2All)}
                >To All</Button>

                <Button
                    type="primary"
                    onClick={() => handleClick(toSendMsg2Others)}
                >To Others</Button>
            </div>

            <div className={styles.footer}>
                <label>Room</label>

                <Input
                    value={inputRoom}
                    onChange={(e: any) => setInputRoom(e?.target?.value)}
                />

                <Button
                    type="primary"
                    onClick={() => toJoinRoom(inputRoom)}
                >Join</Button>

                <Button
                    type="primary"
                    onClick={() => toLeaveRoom(inputRoom)}
                >Leave</Button>
            </div>
        </div>
    )
}