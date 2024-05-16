/**
 * gif 压缩
 * 
 * 对应的后端代码： nestjs-source-code/gif-compression-backend
 */
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Form, Input, Button } from 'antd';
import axios from 'axios'

const { Dragger } = Upload;


export const GifCompressionFrontend = () => {
    const [form] = Form.useForm();
    const [filePath, setFilePath] = useState('');
    const [fileName, setFileName] = useState('');

    const compress = async (values: any) => {
        const res = await axios.get('http://localhost:3000/compression', {
            params: {
                color: values.color || 256,
                // level: values.level || 9,
                path: filePath
            },
            responseType: 'arraybuffer'
        });

        const blob = new Blob([res.data], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a'); 
        link.href = url; 
        link.download = fileName;
        link.click(); 

        message.success('压缩成功');
    };

    const props = {
        name: 'file',
        action: 'http://localhost:3000/upload',
        onChange(info: any) {
            const { status } = info.file;
            if (status === 'done') {
                setFilePath(info.file.response);
                setFileName(info.file.name);
                message.success(`${info.file.name} 文件上传成功`);
            }
            else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败`);
            }
        }
    };

    return (
        <div style={{height: '500px'}}>
            <Form
                style={{width: 500, margin: '50px auto'}}
                form={form}
                onFinish={compress}
            >
                <Form.Item
                    label="颜色数量"
                    name="color"
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
                    </Dragger>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">压缩</Button>
                </Form.Item>
            </Form>
        </div>
    )
}