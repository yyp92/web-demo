import React from 'react';
import Ttml2canvas from './components/Ttml2canvas'
import {
    ChartEvenDistribution,
    ChartGaussianDistribution,
    ChartLogarithmDistribution,
    ChartPoissonDistribution,
    ChartExponentDistribution,
    ChartBinomialDistribution,
    ChartGammaDistribution,
} from './components/Antv/G2'
import {
    Empty,
    StickyPage,
    BackgroundClip,
    CssMask,
    CssVariableAnimation,
    BubbleLoading,
    ImgGraduallyDisappear,
    CssHexagon,
} from './components/CssAttr'

export interface RouterConfigItem {
    key: string;
    parentKey?: string
    index?: true
    text?: string;
    template?: null | React.ReactElement;
    link?: string;
    icon: null | React.ReactElement;
    children?: RouterConfigItem[]
}

// 路由配置项
export const routerConfig: RouterConfigItem[] = [
    {
        key: 'js-demo',
        text: 'js-demo',
        link: '/js-demo',
        // template: <Home />,
        icon: null,
        // children: [],
        children: [
            {
                key: 'Ttml2canvas',
                parentKey: 'js-demo',
                index: true,
                text: 'Ttml2canvas',
                link: '/',
                template: <Ttml2canvas />,
                icon: null,
            },
            // {
            //     key: 'home2',
            //     parentKey: 'home',
            //     text: 'Home2',
            //     link: 'home2',
            //     template: <>Home2</>,
            //     icon: null,
            // }
        ],
    },
    {
        key: 'css-demo',
        text: 'css-demo',
        link: 'css-demo',
        // template: <>about</>,
        icon: null,
        children: [
            {
                key: 'empty',
                parentKey: 'css-demo',
                index: true,
                text: '伪类-empty',
                link: '/',
                template: <Empty />,
                icon: null,
            },
            {
                key: 'sticky',
                parentKey: 'css-demo',
                text: 'position-sticky',
                link: 'sticky',
                template: <StickyPage />,
                icon: null,
            },
            {
                key: 'background-clip',
                parentKey: 'css-demo',
                text: 'background-clip',
                link: 'background-clip',
                template: <BackgroundClip />,
                icon: null,
            },
            {
                key: 'mask',
                parentKey: 'css-demo',
                text: 'mask',
                link: 'mask',
                template: <CssMask />,
                icon: null,
            },
            {
                key: 'variable-animation',
                parentKey: 'css-demo',
                text: '网格动画',
                link: 'variable-animation',
                template: <CssVariableAnimation />,
                icon: null,
            },
            {
                key: 'bubble-loading',
                parentKey: 'css-demo',
                text: '气泡 Loading',
                link: 'bubble-loading',
                template: <BubbleLoading />,
                icon: null,
            },
            {
                key: 'img-gradually-disappear',
                parentKey: 'css-demo',
                text: '图片渐隐消失术',
                link: 'img-gradually-disappear',
                template: <ImgGraduallyDisappear />,
                icon: null,
            },
            {
                key: 'css-hexagon',
                parentKey: 'css-demo',
                text: '六芒星能力图',
                link: 'css-hexagon',
                template: <CssHexagon />,
                icon: null,
            },
        ],
    },
    {
        key: 'antv',
        text: 'antv',
        link: 'antv',
        // template: <>dashboard</>,
        icon: null,
        children: [
            {
                key: 'g2-ChartEvenDistribution',
                parentKey: 'antv',
                index: true,
                text: '概率分布-正态分布',
                link: '/',
                template: <ChartEvenDistribution />,
                icon: null,
            },
            {
                key: 'g2-ChartGaussianDistribution',
                parentKey: 'antv',
                text: '概率分布-高斯分布',
                link: 'g2-ChartGaussianDistribution',
                template: <ChartGaussianDistribution />,
                icon: null,
            },
            {
                key: 'g2-ChartLogarithmDistribution',
                parentKey: 'antv',
                text: '概率分布-对数正态分布',
                link: 'g2-ChartLogarithmDistribution',
                template: <ChartLogarithmDistribution />,
                icon: null,
            },
            {
                key: 'g2-ChartPoissonDistribution',
                parentKey: 'antv',
                text: '概率分布-泊松分布',
                link: 'g2-ChartPoissonDistribution',
                template: <ChartPoissonDistribution />,
                icon: null,
            },
            {
                key: 'g2-ChartExponentDistribution',
                parentKey: 'antv',
                text: '概率分布-指数分布',
                link: 'g2-ChartExponentDistribution',
                template: <ChartExponentDistribution />,
                icon: null,
            },
            {
                key: 'g2-ChartBinomialDistribution',
                parentKey: 'antv',
                text: '概率分布-二项分布',
                link: 'g2-ChartBinomialDistribution',
                template: <ChartBinomialDistribution />,
                icon: null,
            },
            {
                key: 'g2-ChartGammaDistribution',
                parentKey: 'antv',
                text: '概率分布-伽马分布',
                link: 'g2-ChartGammaDistribution',
                template: <ChartGammaDistribution />,
                icon: null,
            },
        ],
    },

    // 使用 path="*"" 意味着 "匹配所有路径", 所以我们不需要明确地列出别的路径了。
    {
        key: '404',
        link: '*',
        template: <>404</>,
        icon: null,
        children: [],
    }
]
