/**
 * 文档：https://github.com/svga/SVGAPlayer-Web/blob/master/README.zh.md
 */
import React from 'react';
import { isFunction } from 'lodash';
import * as SVGA from 'svgaplayerweb';
import s from './index.module.scss';

interface SvgaImgProps {
    src?: string;
    id?: string;
    placeholder?: React.ReactNode;
    goPage?: () => void;

    [key: string]: any;
}

export const SvgaImg1: React.FC<SvgaImgProps> = ({
    src = '',
    id = '',
    placeholder = null,
    goPage = () => {}
}) => {
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

    React.useEffect(() => {
        // 创建实例
        const player = new SVGA.Player(`#svga-${id}`);
        // 是否兼容
        const parser = new SVGA.Parser();

        // 跨域的 SVGA 资源需要使用 CORS 协议才能加载成功。
        parser.load(src, videoItem => {
            setIsSuccess(true);
            player.setVideoItem(videoItem);
            // 开始播放动画
            player.startAnimation();
        });

        return () => {
            player.clear();
        };
    }, [src]);

    const renderContent = () => {
        if (isSuccess) {
            return null;
        }

        return <div className={s.placeholder}>{placeholder}</div>;
    };

    const renderWrap = () => {
        return (
            <div className={`${s.svgaWrap} svga-wrap`}>
                {renderContent()}

                <div
                    id={`svga-${id}`}
                    onClick={() => isSuccess && isFunction(goPage) && goPage()}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </div>
        );
    };

    return renderWrap();
};
