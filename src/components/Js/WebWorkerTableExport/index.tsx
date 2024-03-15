import {useEffect, useState} from 'react'
import {Button, Table} from 'antd'

// exceljs 是一个流行的 Node.js 模块，用于创建、读取和编辑 Excel 文件
import ExcelJS from 'exceljs';
// file-saver 是一个用于在浏览器端保存文件的 JavaScript 库。通过使用 file-saver，你可以在客户端生成文件并将其保存到本地。通常，它用于在浏览器中生成和下载文件，比如在前端应用程序中创建和下载 Excel 文件、文本文件、图片文件等。
import FileSaver from 'file-saver';
// * 这样可以直接引用 worker.ts
import ExcelWorker from './excel.worker?worker';

import styles from './index.module.scss'


const dataSource: any[] = [];

for (let i = 1; i < 30000; i++) {
    dataSource.push({
        key: i,
        name: `name-${i}`,
        age: 18,
        tag: '测试同学',
        value1: `value1-${i}`,
        value2: `value2-${i}`,
        value3: `value3-${i}`,
    });
}

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '标签',
        dataIndex: 'tag',
        key: 'tag',
    },
    {
        title: 'value1',
        dataIndex: 'value1',
        key: 'value1',
    },
    {
        title: 'value2',
        dataIndex: 'value2',
        key: 'value2',
    },
    {
        title: 'value3',
        dataIndex: 'value3',
        key: 'value3',
    }
]

export const WebWorkerTableExport = () => {
    const [showTime, setShowTime] = useState<number>(Date.now())

    useEffect(() => {
        updateShowTime();
    }, []);


    // ********** 操作 *********
    const updateShowTime = () => {
        setShowTime(Date.now());
        requestAnimationFrame(updateShowTime);
    };

    // 主线程导出Excel
    const mainExportExcel = () => {
        // 创建工作簿
        const workbook = new ExcelJS.Workbook();
        // 添加工作表
        const worksheet = workbook.addWorksheet('sheet1');

        // 设置表格内容
        const _titleCell = worksheet.getCell('A1');
        _titleCell.value = 'Hello ExcelJS!';

        const workBookColumns = columns.map((item: any) => ({
            header: item.title,
            key: item.key,
            width: 32,
        }));
        worksheet.columns = workBookColumns;
        worksheet.addRows(dataSource);

        // 导出表格
        workbook.xlsx.writeBuffer().then((buffer: any) => {
            let _file = new Blob([buffer], {
                type: 'application/octet-stream',
            });

            FileSaver.saveAs(_file, 'ExcelJS.xlsx');
        });
    }

    // 子线程导出Excel
    const workerExportExcel = async () => {
        const _file = await new Promise((resolve, reject) => {
            const myWorker = new ExcelWorker();

            myWorker.postMessage({
                columns,
                dataSource,
            });

            myWorker.onmessage = (e: any) => {
                resolve(e.data.data);
                
                // 关闭worker线程
                myWorker.terminate();
            };
        });

        FileSaver.saveAs(_file, 'ExcelJS.xlsx');
    }


    // ********** 渲染 *********
    return (
        <div className={styles.webWorkerTableExport}>
            <h2>WebWorker 应用场景 表格数据导出</h2>

            <div style={{marginTop: 30}}>
                <div style={{marginBottom: 30}}>
                    <Button
                        style={{marginRight: 10}}
                        onClick={mainExportExcel}
                        type="primary"
                    >导出全部</Button>

                    <Button
                        style={{marginRight: 10}}
                        type="primary"
                        onClick={workerExportExcel}
                    >worker导出全部</Button>

                    <span>{showTime}</span> 
                </div>

                <Table dataSource={dataSource} columns={columns} />
            </div>
        </div>
    )
}