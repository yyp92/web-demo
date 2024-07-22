import React, { useEffect, useState, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';

const preStyle = {
    width: '100%',
    maxHeight: '64vh',
    minHeight: '64vh',
    overflow: 'auto',
}

// Markdown展示组件
function MarkdownViewer({
    docUrl,
    searchText
}: {
    docUrl: string;
    searchText: string
}) {
    const [markdown, setMarkdown] = useState('');
    const markdownRef = useRef<HTMLDivElement | null>(null);

    const highlightAndMarkFirst = (text: string, highlightText: string) => {
        let firstMatchDone = false;
        const regex = new RegExp(`(${highlightText})`, 'gi');

        return text.replace(regex, (match) => {
            if (!firstMatchDone) {
                firstMatchDone = true;
                return `<span id='first-match' style="color: red;">${match}</span>`;
            }
            
            return `<span style="color: red;">${match}</span>`;
        });
    };

    useEffect(() => {
        // 如果没有搜索内容，直接加载原始Markdown文本
        fetch(docUrl)
            .then((response) => response.text())
            .then((text) => {
                const highlightedText = searchText
                    ? highlightAndMarkFirst(text, searchText)
                    : text;

                setMarkdown(highlightedText);
            })
            .catch((error) => console.error('加载Markdown文件失败：', error));
    }, [searchText, docUrl]);

    useEffect(() => {
        if (markdownRef.current) {
            // 支持代码高亮
            marked.use({
                renderer: {
                    // @ts-ignore
                    code(code: any, infostring: any) {
                        const validLang = !!(infostring && hljs.getLanguage(infostring));
                        const highlighted = validLang
                            ? hljs.highlight(code, { language: infostring, ignoreIllegals: true }).value
                            : code;

                        return `<pre><code class="hljs ${infostring}">${highlighted}</code></pre>`  as any;
                    },

                    // 链接跳转
                    // @ts-ignore
                    link(href: any, title: any, text: any) {
                        const isExternal = !href.startsWith('/') && !href.startsWith('#');

                        if (isExternal) {
                            return `<a href="${href}" title="${title}" target="_blank" rel="noopener noreferrer">${text}</a>`;
                        }

                        return `<a href="${href}" title="${title}">${text}</a>`;
                    },
                },
            });

            const htmlContent = marked.parse(markdown);
            markdownRef.current!.innerHTML = htmlContent as string;
            // 当markdown更新后，检查是否需要滚动到高亮位置
            const firstMatchElement = document.getElementById('first-match');

            if (firstMatchElement) {
                firstMatchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [markdown]);

    return (
        <div style={preStyle}>
            <div ref={markdownRef} />
        </div>
    );
}

export default MarkdownViewer;