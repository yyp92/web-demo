import React, { useRef, useEffect } from 'react';

interface IProps {
    type: 'audio' | 'video';
    url: string;
    timeInSeconds: number;
}

const AudioAndVideo = (props: IProps) => {
    const {
        type,
        url,
        timeInSeconds
    } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // 音视频定位
        const secondsTime = timeInSeconds / 1000;

        if (type === 'audio' && audioRef.current) {
            audioRef.current.currentTime = secondsTime;
        }

        if (type === 'video' && videoRef.current) {
            videoRef.current.currentTime = secondsTime;
        }
    }, [type, timeInSeconds]);

    return (
        <div>
            {
                type === 'audio'
                    ? (
                        <audio
                            ref={audioRef}
                            controls
                            controlsList="nodownload"
                            style={{ width: '100%' }}
                        >
                            <track kind="captions" />

                            <source
                                src={url}
                                type="audio/mpeg"
                            />
                        </audio>
                    )
                    : (
                        <video
                            ref={videoRef}
                            controls
                            muted
                            controlsList="nodownload"
                            style={{ width: '100%' }}
                        >
                            <track kind="captions" />

                            <source
                                src={url}
                                type="video/mp4"
                            />
                        </video>
                    )
            }
        </div>
    );
}

export default AudioAndVideo;