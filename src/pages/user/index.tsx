import { View, Text } from "@tarojs/components";
import { useLoad, navigateTo, getStorageSync } from "@tarojs/taro";
import { AtToast } from "taro-ui";
import { useEffect, useState } from "react";
import { getCourses } from '../../apis/user';
// import { AtCalendar } from "taro-ui";

import './index.less'

import CImg from '../../assets/images/test/c.jpeg';

interface CourseInfo {
    name: string;
    username: string;
    consume: number;
    rest: number;
}

export default function User () {

    const [isOpened, setIsOpened] = useState(false);
    const [msgText, setMsgText] = useState('请登录');
    const [courseInfo, setCourseInfo] = useState<any>(null);

    const userInfo = getStorageSync('userInfo')

    useEffect(() => {
        // setIsOpened(true);
        // setTimeout(() => {
        //     navigateTo({
        //         url: 'pages/login/index'
        //     })
        // }, 2000)
        const _userInfo = getStorageSync('userInfo')
        getCourses(_userInfo.name).then((res) => {
            console.log('get_course:', res);
            setCourseInfo(res[0]);
        }).catch(err => {})
    }, [])

    return(
        <View className='user-page'>
            <View className='user-header'>
                <View className='user-avatar'>
                    <img src={CImg} alt='avatar' />
                </View>
                <View>
                    <View>
                        <Text>{userInfo.nickname || userInfo.name}</Text>
                    </View>
                    <View className='user-status'>
                        <Text>
                            UserStatus
                        </Text>
                    </View>
                </View>
            </View>
            <View className='class-info'>
                <View>
                    <Text>已上课时</Text>
                    <Text>{courseInfo.consume}</Text>
                </View>
                <View><Text>剩余课时</Text></View>
                <Text>{courseInfo.rest}</Text>
            </View>
            <View className='banner'>
                <img src={CImg} alt='banner' />
            </View>
            <View className='class-table'>
                <Text>课程表</Text>
                {/* <AtCalendar /> */}
            </View>
            {/* {isOpened && <AtToast isOpened text={msgText} icon='{icon}'></AtToast>} */}
        </View>
    )
}