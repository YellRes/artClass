import { View, Text } from "@tarojs/components";
import Swiper from '../../components/Swiper';
import Card from '../../components/Card';
import './index.less';
import { useEffect, useState } from "react";
import { AtIcon } from 'taro-ui'

import CImg from '../../assets/images/test/c.jpeg';
import AImg from '../../assets/images/test/a.jpg';
import BImg from '../../assets/images/test/b.jpg';

interface _Swiper {
    img: string;
    href?: string;
}

interface Info {
    title: string;
    extra?: string;
    id: number|string;
}

interface _Info extends Info {
    img: string;
    userName: string;
    avatar: string;
    [key: string]: any;
}

interface ContentFuncProps {
    info: _Info;
}

export default function Home () {

    let [swipers, setSwipers] = useState([] as Array<_Swiper>);
    let [cards, setCards] = useState([] as Array<_Info>);

    useEffect(() => {
        setSwipers([
            { img: CImg, href: '1' },
            { img: CImg, href: '2' },
            { img: CImg, href: '3' },
        ])
        setCards([
            { title: 'xxx作图', img: CImg, userName: 'user1', avatar: AImg, id: '1' },
            { title: '2', img: BImg, userName: 'user2', avatar: AImg, id: '2' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: BImg, userName: 'user3', avatar: AImg, id: '4' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '5' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '6' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '7' },
            { title: '3', img: BImg, userName: 'user3', avatar: AImg, id: '8' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '9' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '10' },
            { title: '3', img: BImg, userName: 'user3', avatar: AImg, id: '11' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '12' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '13' },
            { title: '3', img: BImg, userName: 'user3', avatar: AImg, id: '14' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '15' },
        ])
    }, [])

    const ContentFunc = (props: ContentFuncProps) => {
        const {title, img, userName, avatar, desc} = props.info;
        return(
            <View className="card-content">
                <img src={img} title={desc}></img>
                <View className="card-title">
                    <Text>{title}</Text>
                </View>
                <View className="card-bottom">
                    {/* <img src={avatar} alt="avatar" /> */}
                    <Text>{userName}</Text>
                    <AtIcon value='heart' size='16' color='#F00'></AtIcon>
                </View>
            </View>
        )
    }
    // Todo: 整成瀑布流试试
    return(
        <View className="home-page">
            <Swiper>
                {
                    swipers.map(item => {
                        return (
                            <img className="swiper-img" src={item.img} key={item.href} />
                        )
                    })
                }
            </Swiper>
            <Text className="panel__title">学员优秀作品展</Text>
            <View className="card-list">
                {
                    cards.map(item => {
                        return (<Card info={item} key={item.id}>
                            <ContentFunc info={item} />
                        </Card>)
                    })
                }
            </View>
            
        </View>
    )
}