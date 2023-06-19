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
            { img: CImg },
            { img: CImg },
            { img: CImg },
        ])
        setCards([
            { title: 'xxx作图', img: CImg, userName: 'user1', avatar: AImg, id: '1' },
            { title: '2', img: BImg, userName: 'user2', avatar: AImg, id: '2' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: BImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: BImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: BImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: BImg, userName: 'user3', avatar: AImg, id: '3' },
            { title: '3', img: CImg, userName: 'user3', avatar: AImg, id: '3' },
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
                            <img className="swiper-img" src={item.img} />
                        )
                    })
                }
            </Swiper>
            <Text className="panel__title">学员优秀作品展</Text>
            <View className="card-list">
                {
                    cards.map(item => {
                        return (<Card info={item}>
                            <ContentFunc info={item} />
                        </Card>)
                    })
                }
            </View>
            
        </View>
    )
}