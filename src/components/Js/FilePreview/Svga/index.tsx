import React from 'react';
import { isFunction } from 'lodash';
import SVGA from 'svgaplayerweb';
import s from '../index.module.scss';

interface SvgaImgProps {
  src?: string;
  id?: string;

  [key: string]: any;
}

const SvgaImg: React.FC<SvgaImgProps> = ({
    src = '',
    id = '',
    placeholder = null,
    goPage
}) => {
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

    React.useEffect(() => {
        const player = new SVGA.Player(`#svga-${id}`);
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
                {/* {renderContent()} */}

                <div
                    id={`svga-${id}`}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    // onClick={() => isSuccess && isFunction(goPage) && goPage()}
                />
            </div>
        );
    };

    return renderWrap();
};

export default SvgaImg;

