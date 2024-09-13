/**
 * 创建音频
 * 
 * 就是用一个 Map 保存所有的 Audio 节点，key 为对应流程图节点的 id，然后暴露创建节点、节点连接、删除节点、更新节点参数，暂停、恢复播放的方法
 */
const context = new AudioContext();

const osc = context.createOscillator();
osc.frequency.value = 220;
osc.type = 'square';
osc.start();

const volume = context.createGain();
volume.gain.value = 0.5;

const out = context.destination;

const nodes = new Map();

// 首先，内置 3 个节点
nodes.set('a', osc);
nodes.set('b', volume);
nodes.set('c', out);

export function isRunning() {
    return context.state === 'running';
}

// 一个暂停、修复声音播放的方法
export function toggleAudio() {
    return isRunning() ? context.suspend() : context.resume();
}

// 更新参数的方法
export function updateAudioNode(id: string, data: Record<string, any>) {
    const node = nodes.get(id);

    for (const [key, val] of Object.entries(data)) {
        if (node[key] instanceof AudioParam) {
            node[key].value = val;
        }
        else {
            node[key] = val;
        }
    }
}

// 删除 Audio 节点的方法
export function removeAudioNode(id: string) {
    const node = nodes.get(id);

    // 首先 disconnect 所有的连接，然后 stop 这个 Audio 节点，之后从 map 中删除它
    node.disconnect();
    node.stop?.();

    nodes.delete(id);
}

// Audio 节点的连接
export function connect(sourceId: string, targetId: string) {
    const source = nodes.get(sourceId);
    const target = nodes.get(targetId);

    source.connect(target);
}

// Audio 节点的断开连接
export function disconnect(sourceId: string, targetId: string) {
    const source = nodes.get(sourceId);
    const target = nodes.get(targetId);
    source.disconnect(target);
}

// 然后暴露了一个 createAudioNode 的方法来创建两种节点（destination 节点只有一个）
export function createAudioNode(id: string, type: string, data: Record<string, any>) {
    switch (type) {
        case 'osc': {
            const node = context.createOscillator();
            node.frequency.value = data.frequency;
            node.type = data.type;
            node.start();

            nodes.set(id, node);
            break;
        }

        case 'volume': {
            const node = context.createGain();
            node.gain.value = data.gain;

            nodes.set(id, node);
            break;
        }
    }
}




// const context = new AudioContext()

// const osc = context.createOscillator()
// osc.frequency.value = 220
// osc.type = 'square'
// osc.start()

// const volume = context.createGain()
// volume.gain.value = 0.5

// const out = context.destination

// osc.connect(volume)
// volume.connect(out)



// const osc2 = context.createOscillator();
// osc2.frequency.value = 800;
// osc2.type = 'sine';
// osc2.start();

// const volume2 = context.createGain();
// volume2.gain.value = 0.5;

// osc2.connect(volume2);
// volume2.connect(out);

