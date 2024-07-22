import {useState} from 'react'
import {Button} from 'antd'
import SvgaImg from './Svga'
import AudioAndVideo from './AudioAndVideo'
import TextFileViewer from './TextFileViewer'
import MarkdownViewer from './MarkdownViewer'
import FileViewer from './FileViewer'

import jpgUrl from '@/assets/file-2.jpg'
import webpUrl from '@/assets/file-1.webp'


import styles from './index.module.scss'

type FileTypeProps = 'jpg' | 'png' |'jpeg' | 'webp' |'svga' | 'audio' | 'video' | 'md' | 'txt' | 'docx' | 'doc' | 'pdf' | 'xlsx'
const imgList = ['jpg', 'png','jpeg', 'webp','svga']

export const FilePreview = () => {
    const [fileType, setFileType] = useState<FileTypeProps>('jpg')
    const [url, setUrl] = useState<string>('')


    // ********* 渲染 *********
    const renderContent = () => {
        if (fileType === 'svga') {
            return (
                <SvgaImg 
                    id={'11'}
                    src={url}
                />
            )
        }
        else if (imgList.includes(fileType)) {
            return (
                <img
                    src={url}
                    alt={'图片错误'}
                    width="100%"
                />
            )
        }
        else if (fileType === 'audio') {
            return (
                <AudioAndVideo
                    type="audio"
                    url={url}
                    timeInSeconds={0}
                />
            )
        }
        else if (fileType === 'video') {
            return (
                <AudioAndVideo
                    type="video"
                    url={url}
                    timeInSeconds={0}
                />
            )
        }
        else if (fileType === 'md') {
            return (
                <MarkdownViewer
                    docUrl={url}
                    searchText={''}
                />
            )
        }
        else if (fileType === 'txt') {
            return (
                <TextFileViewer
                    docurl={url}
                    searchText={'美好'}
                />
            )
        }
        else if (['doc', 'docx', 'xlsx', 'pdf'].includes(fileType)) {
            return (
                <FileViewer
                    file={url}
                    fileType={fileType}
                />
            )
        }

        return null
    }

    return (
        <div className={styles.preview}>
            <div>
                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('jpg')
                        setUrl(jpgUrl)
                    }}
                >图片预览</Button>

                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('webp')
                        setUrl(webpUrl)
                    }}
                >图片预览 - webp</Button>

                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('svga')
                        // setUrl('/file-3.svga')
                        setUrl('/file-angel.svga')
                    }}
                >图片预览 - svga</Button>

                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('audio')
                        setUrl('/file-audio.mp3')
                    }}
                >音频</Button>

                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('video')
                        setUrl('/file-video.mp4')
                    }}
                >视频</Button>

                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('md')
                        setUrl('/file-markdown.md')
                    }}
                >markdown</Button>

                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('txt')
                        setUrl('/file-txt.txt')
                    }}
                >txt</Button>

                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('docx')
                        setUrl('/file-docx.docx')
                    }}
                >office-doc</Button>

                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('xlsx')
                        setUrl('/file-xlsx.xlsx')
                    }}
                >office-excel</Button>

                <Button
                    type="primary"
                    onClick={() => {
                        setFileType('pdf')
                        setUrl('/file-pdf.pdf')
                    }}
                >office-pdf</Button>
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
    )
}
