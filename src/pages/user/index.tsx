import { View, Text } from "@tarojs/components";
import { useLoad, navigateTo, getStorageSync } from "@tarojs/taro";
import { AtToast, AtCalendar, AtAccordion, AtList, AtListItem } from "taro-ui";
import { useEffect, useState } from "react";
import { getCourses } from '../../apis/user';
import { createUserCourse } from '../../apis/course';

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
    const [courseInfo, setCourseInfo] = useState<any>([]),
    [courses, setCourses] = useState<any>([]);

    const [selected, setSelected] = useState('');

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [curDay, setCurDay] = useState(dayjs().format('YYYY-MM-DD'));
    const [curWeek, setCurWeek] = useState(3);

    const userInfo = getStorageSync('userInfo'),
    markedDates = {
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
    };

    const [curCalendar, setCurCalendar] = useState<any>(null),
    [curMarkDays, setCurMarkDays] = useState<any>([]);

    const monthChange = (v:string) => {
        console.log(`month: ${v}`);
        setCurDay(v);
        const dd = getCalanders(courseInfo, v);
        setCurCalendar(dd);
        setCurWeek(Math.floor((Math.random() * 6)))
        const __v = setMarkDays(v, dd);
        setCurMarkDays(__v);
    },
    selectDate = (v:any) => {
        console.log(`date:`, v);
        const _v = curCalendar[dayjs(v.value.start).day()];
        console.log('___', _v);
        setCourses(_v || [])
    },
    setMarkDays = (day,curCalendar) => {
        const _v = [] as Array<any>;
        curCalendar.forEach((item, index) => {
            if (item) {
                _v.push(...getDays(day,index,item.startDate, item.endDate));
            }
        });
        return _v;
    },
    getDays = (day:string, week: number, startDay?:string, endDay?:string):Array<any> => {
        const _l = week - dayjs(day).date(1).get('day');
        let date = (_l >=0 ? _l : _l + 7) + 1;
        // const firstDay = dayjs(day).date(date);
       const lastDayOfMonth = dayjs(dayjs(day).add(1,'month').date(0)).date();
       const daysArr = [dayjs(day).date(date).format('YYYY-MM-DD')] as Array<string>;
       while((date += 7) < lastDayOfMonth) {
            const _day = dayjs(day).date(date);
            if (startDay && endDay) {
                if (_day >= dayjs(startDay) && _day <= dayjs(endDay)) {
                    daysArr.push(dayjs(_day).format('YYYY-MM-DD'))
                } else {

                }
            } else {
                daysArr.push(dayjs(_day).format('YYYY-MM-DD'))
            }
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
    },
    changeOpen = () => {
        setIsOpen(!isOpen)
    };

    const getCalanders = (v:Array<any>, curDay:string) => {
        let _value = [] as Array<any>;
        // 获取该月课程
        const _c = v.filter(item => {
            return dayjs(item.endTime) >= dayjs(curDay).date(1) && dayjs(item.startTime) <= dayjs(dayjs(curDay).add(1,'month').date(0))
        });
        _c.map(item => {
            return item.detail.map(ite => ({...ite, startDate: item.startTime, endDate: item.endTime}))
        }).flat().forEach((item,index) => {
            console.log(`week${item.week}`)
            _value[item.week] =  _value[item.week] ? [..._value[item.week],...item.info] : [...item.info]
        });
        console.log('get_calander', _value);
        return _value || [];
    },
    createCourse = async () => {
        const res = await createUserCourse({
            name: 'course-api',
            username: userInfo.name,
            startTime: '2024-08-08',
            endTime: '2024-10-10',
            detail: [{week: 5, info: [{startTime: '09:00', endTime: '12:00', sort:1, name: 'course-api'}]}],
            status: 0
        });
        console.log(`create-course: ${res}`);
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
            const dd = getCalanders(res, dayjs().format('YYYY-MM-DD'));
            setCurCalendar(dd);
            const __v = setMarkDays(dayjs().format('YYYY-MM-DD'), dd);
            setCurMarkDays(__v);
            setCourseInfo(res);
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
                    <View className='user-status' onClick={createCourse}>
                        <Text>
                            UserStatus
                        </Text>
                    </View>
                </View>
            </View>
            {/* <View className='class-info'>
                <View>
                    <Text>已上课时</Text>
                    <Text>{courseInfo?.[0]?.consume}</Text>
                </View>
                <View><Text>剩余课时</Text></View>
                <Text>{courseInfo?.[0]?.rest}</Text>
            </View> */}
            <View>
                <AtAccordion
                    open={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    title='课时信息:'>
                        <AtList hasBorder={false}>

                        {courseInfo.length ? courseInfo.map((item, index) => {
                            return <AtListItem
                            key={index}
                            title={item.name}
                            note={`已上课时: ${item.consume}  剩余课时: ${item.rest}`}
                        />
                        }) :
                        <AtListItem title="无" />
                        }
                            </AtList>

                </AtAccordion>
            </View>
            <View className='banner'>
                <img src={CImg} alt='banner' />
            </View>
            <View className='class-table'>
                <Text>课程表{isOpen}</Text>
                <AtCalendar
                    marks={ curMarkDays.map(item => ({value: item})) }
                    onMonthChange={monthChange}
                    onSelectDate={selectDate}
                    />
                <AtAccordion
                    open={isOpen}
                    onClick={changeOpen}
                    title='当日课程:'>
                        <AtList hasBorder={false}>

                        {courses.length ? courses.map(item => {
                            return <AtListItem
                            key={item.sort}
                            title={item.name}
                            note={`${item.startTime} - ${item.endTime}`}
                        />
                        }) :
                        <AtListItem title="无" />
                        }
                            </AtList>

                        {/* <AtList hasBorder={false}>
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
                            </AtList> */}
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