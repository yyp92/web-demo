/**
 * * Fuse.js一个轻量高效的模糊搜索库
 * https://www.fusejs.io/
 */

import { useEffect, useRef, useState } from "react"
import Fuse from 'fuse.js'
import { Input } from 'antd'

const books = [
    {
        title: "Old Man's War",
        author: {
            firstName: 'John',
            lastName: 'Scalzi'
        }
    },
    {
        title: 'The Lock Artist',
        author: {
            firstName: 'Steve',
            lastName: 'Hamilton'
        }
    }
]

export const FuseCom = () => {
    const [value, setValue] = useState<string>('')
    const [result, setResult] = useState<any>('')

    const handleChange = (e: any) => {
        const newValue = e.target.value
        setValue(newValue)

        // 简单配置
        // const fuse = new Fuse(books, {
        //     keys: [
        //         'title',
        //         'author.firstName'
        //     ]
        // })

        // 高级配置
        const options = {
            // 指定搜索key值，可多选
            keys: ['title', 'author.firstName'],

            // 是否区分大小写 默认为false
            isCaseSensitive: false,

            // 结果集中是否展示匹配项的分数字段， 分数越大代表匹配程度越低，区间值为0-1,注意：当此项为true时，会返回完整的结果集，只不过每一项中携带了score分数字段
            // includeScore: false,

            // 匹配项是否应包含在结果中。当时true，结果的每条记录都包含匹配项的索引。这个通常我们用来对搜索内容做高亮处理
            includeMatches: false,

            // 阈值控制匹配的敏感度,默认值为0.6，如果要完全匹配这里要设置为0
            threshold: 0.6,

            // 是否对结果进行排序
            shouldSort: true,

            // 匹配的位置，0 表示开头匹配
            location: 0,

            // 搜索的最大距离
            distance: 100,

            // 最小匹配字符长度
            minMatchCharLength: 2,
        };

        const fuse = new Fuse(
            books,
            options
        )

        const result = fuse.search(newValue)
        setResult(JSON.stringify(result))

        console.log('----result', result)
    }

    return (
        <div>
            <h2>模糊搜索</h2>

            <Input
                style={{
                    width: '300px',
                    marginTop: '20px'
                }}
                value={value}
                onChange={handleChange}
            />

            <div
                style={{
                    marginTop: '20px'
                }}
            >匹配结果：{result}</div>
        </div>
    )
}
