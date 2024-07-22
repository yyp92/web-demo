import { useEffect, useState } from "react";
import NewFileViewer from 'react-file-viewer'
import styles from '../index.module.scss'

const FileViewer = (
    props: any
) => {
    const getError = (val: any) => {
        console.log('err=', val)
    }
    
    return (
        <div className={styles.fileView}>
            {
                props.fileType
                    ? (
                        <NewFileViewer
                            fileType={props.fileType}
                            filePath={props.file}
                            errorComponent={getError}
                            onError={(err: any) => console.log(err)}
                        />
                    )
                    : (
                        <div className='file-view-warn'>暂无文件预览</div>
                    )
            }
        </div>
    )
}

export default FileViewer
