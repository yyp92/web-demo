import React from 'react';
import {v4 as uuidv4 } from 'uuid'
import {SvgaImg1} from './SvgaImg1'
import mofang from './img/mofang.webp'



export const SvgaImg = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            <SvgaImg1
                // src={import.meta.resolve('./img/pinJump.svga')}
                src={'/file-angel.svga'}
                id={uuidv4()}
            />

            {/* <img src={mofang} /> */}
        </div>
    )
};
