import { View, Swiper, SwiperItem } from '@tarojs/components'

import './index.less';
import { ReactNode } from 'react';

interface Props {
    children: Array<ReactNode>
}

export default function SwiperComponent (props:Props) {
    return (
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay={false}
        >
                {
                    props.children.map((item, index) => {
                        return (<SwiperItem key={index}>{item}</SwiperItem>)
                    })
                }
        </Swiper>
    )
}