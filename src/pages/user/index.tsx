import { View, Text } from "@tarojs/components";
import { useLoad, navigateTo, getStorageSync } from "@tarojs/taro";
import { AtToast, AtCalendar, AtAccordion, AtList, AtListItem } from "taro-ui";
import { useEffect, useState } from "react";
import { getCourses } from '../../apis/user';

import dayjs from 'dayjs';

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

    const [selected, setSelected] = useState('');

    const [isOpen, setIsOpen] = useState(true);

    const [curDay, setCurDay] = useState(dayjs().format('YYYY-MM-DD'));
    const [curWeek, setCurWeek] = useState(3);

    const userInfo = getStorageSync('userInfo'),
    markedDates = {
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
    }

    const monthChange = (v:string) => {
        console.log(`month: ${v}`);
        setCurDay(v);
        setCurWeek(Math.floor((Math.random() * 6)))
    },
    selectDate = (v:Date) => {
        console.log(`date:`, v);
    },
    getDays = (day:string, week: number):Array<any> => {
        const _l = week - dayjs(day).date(1).get('day');
        let date = (_l >=0 ? _l : _l + 7) + 1;
        // const firstDay = dayjs(day).date(date);
       const lastDayOfMonth = dayjs(dayjs(day).add(1,'month').date(0)).date();
       const daysArr = [dayjs(day).date(date).format('YYYY-MM-DD')] as Array<string>;
       while((date += 7) < lastDayOfMonth) {
            daysArr.push(dayjs(day).date(date).format('YYYY-MM-DD'))
       }
       console.log('daysArr',daysArr)
       return daysArr;
    //    const _l = week - dayjs(day).date(1).get('day');
    //    let date = (_l >=0 ? _l : _l + 7) + 1;console.log('d', date);
    //    const firstDay = dayjs(day).date(date);
    //    const lastDayOfMonth = dayjs(dayjs(day).add(1,'month').date(0)).date();
    //    const daysArr = [dayjs(day).date(date).format('YYYY-MM-DD')];
    //    while((date += 7) < lastDayOfMonth) {
    //        console.log('dd');
    //         daysArr.push(dayjs(day).date(date).format('YYYY-MM-DD'))
    //    }
    //    console.log(daysArr);
    //    return daysArr;
    }

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
                    <Text>{courseInfo?.consume}</Text>
                </View>
                <View><Text>剩余课时</Text></View>
                <Text>{courseInfo?.rest}</Text>
            </View>
            <View className='banner'>
                <img src={CImg} alt='banner' />
            </View>
            <View className='class-table'>
                <Text>课程表{curWeek}</Text>
                <AtCalendar
                    marks={ getDays(curDay, curWeek).map(item => ({value: item})) }
                    onMonthChange={monthChange}
                    onSelectDate={selectDate}
                    />
                <AtAccordion
                    open={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    title='当日课程:'>
                        <AtList hasBorder={false}>
                            <AtListItem
                                title='标题文字'
                            />
                            <AtListItem
                                title='标题文字'
                                note='描述信息'
                            />
                            <AtListItem
                                title='标题文字'
                                note='描述信息'
                            />
                            </AtList>
                </AtAccordion>
                <View className="block-page"></View>
                {/* <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    markedDates={markedDates}
                    /> */}
                {/* <AtCalendar /> */}
            </View>
            {/* {isOpened && <AtToast isOpened text={msgText} icon='{icon}'></AtToast>} */}
        </View>
    )
}