import React, { useEffect, useState, useRef } from 'react';

const TextFileViewer = ({
    docurl,
    searchText
}: { docurl: string; searchText: string }) => {
    const [paragraphs, setParagraphs] = useState<string[]>([]);
    const targetRef = useRef<HTMLDivElement | null>(null);

    function highlightText(text: string) {
        if (!searchText.trim()) return text;

        const regex = new RegExp(`(${searchText})`, 'gi');
        return text.replace(regex, `<span style="color: red">$1</span>`);
    }

    useEffect(() => {
        fetch(docurl)
            .then((response) => response.text())
            .then((text) => {
                const highlightedText = highlightText(text);

                const paras = highlightedText
                    .split('\n')
                    .map((para) => para.trim())
                    .filter((para) => para);

                setParagraphs(paras);
            })
            .catch((error) => {
                console.error('加载文本文件出错:', error);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docurl, searchText]);

    useEffect(() => {
        // 处理高亮段落的滚动逻辑
        const timer = setTimeout(() => {
            if (targetRef.current) {
                targetRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [paragraphs]);

    return (
        <div>
            {
                paragraphs.map((para: string, index: number) => {
                    const paraKey = para + index;

                    // 确定这个段落是否包含高亮文本
                    const isTarget = para.includes(`>${searchText}<`);

                    return (
                        <p
                            key={paraKey}
                            ref={
                                isTarget && !targetRef.current
                                    ? targetRef
                                    : null
                            }
                        >
                            <div dangerouslySetInnerHTML={{ __html: para }} />
                        </p>
                    );
                })
            }
        </div>
    );
}

export default TextFileViewer;