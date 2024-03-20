/**
 * ! 需要启动对应的 nodejs 服务，nodejs-basic中 socket/socket.io/ChatSocket.js
 */

import {io} from 'socket.io-client'
import {message} from 'antd'

const SOCKET_ROOT = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/'
    : 'http://localhost:5000/'

export const socket = io(`${SOCKET_ROOT}`)
// export const socketUser = io(`${SOCKET_ROOT}/${namespace}`, {
//     auth: {
//         token: 'fake token'
//     }
// })

socket.on('connect_error', (error: any) => {
    // message.error(error)
    console.error('connect_error', error)
})

// 上层应用回调函数集
const handlerSet: any = {}
export const setCallBackHandle = (
    fnName: any,
    handler: (msg: string) => void
) => {
    handlerSet[fnName] = handler
}

function handleClientConnected() {
    console.log(`You are connected with id of ${socket?.id}`)

    if (!!handlerSet.onConnectionChanged) {
        handlerSet.onConnectionChanged(socket)
    }
}

function handleClientMsg(msgObj: any) {
    console.log(`Receive ${msgObj.msg} on cxt-client-msg from ${msgObj.from}`)

    if (!!handlerSet.onReceiveClientMsg) {
        handlerSet.onReceiveClientMsg(msgObj)
    }
}

// 客户端成功链接到了服务器
socket?.on('connect', handleClientConnected)
// 服务器转发的客户端消息
socket?.on('cxt-client-msg', handleClientMsg)

// 对 hub 进行定制消息
export const toTriggerCxtEventDemo = () => {
    socket?.emit('cxt-event-a', 9, 'xiaoming', {msg: 'hello world'})
}

export const toSendMsg2All = (msg: string) => {
    console.log('toSendMsg2All')

    if (!!msg) {
        socket?.emit('cxt-client-msg-2-all', msg)
    }
}

export const toSendMsg2Others = (msg: string, room?: string) => {
    console.log(`toSendMsg2Others ${!room ? '' : `in room #[${room}]`}`)

    if (!!msg) {
        socket?.emit('cxt-client-msg-2-others', msg, room)
    }
}

export const toJoinRoom = (room: string) => {
    if (!!room) {
        socket?.emit('cxt-client-join-room', room, (response: string) => {
            console.info('cxt-client-join-room', response)
        })
    }
}

export const toLeaveRoom = (room: string) => {
    if (!!room) {
        socket?.emit('cxt-client-leave-room', room)
    }
}

export const toConnect = () => {
    socket?.connect()
    handlerSet.onConnectionChanged(socket)
}

export const toDisconnect = () => {
    socket?.disconnect()
    handlerSet.onConnectionChanged(socket)
}
