import { View, Text } from "@tarojs/components";
import { useLoad, navigateTo } from "@tarojs/taro";
import { AtToast } from "taro-ui";
import { useEffect, useState } from "react";
// import { AtCalendar } from "taro-ui";
import './index.less'

import CImg from '../../assets/images/test/c.jpeg';

export default function User () {

    const [isOpened, setIsOpened] = useState(false);
    const [msgText, setMsgText] = useState('请登录');

    useEffect(() => {
        setIsOpened(true);
        setTimeout(() => {
            navigateTo({
                url: 'pages/login/index'
            })
        }, 2000)
    }, [])

    return(
        <View className="user-page">
            <View className="user-header">
                <View className="user-avatar">
                    <img src={CImg} alt="avatar" />
                </View>
                <View>
                    <View>
                        <Text>UserName</Text>
                    </View>
                    <View className="user-status">
                        <Text>
                            UserStatus
                        </Text>
                    </View>
                </View>
            </View>
            <View className="class-info">
                <View>
                    <Text>已上课时</Text>
                </View>
                <View><Text>剩余课时</Text></View>
            </View>
            <View className="banner">
                <img src={CImg} alt="banner" />
            </View>
            <View className="class-table">
                <Text>课程表</Text>
                {/* <AtCalendar /> */}
            </View>
            {isOpened && <AtToast isOpened text={msgText} icon="{icon}"></AtToast>}
        </View>
    )
}