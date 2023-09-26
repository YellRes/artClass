import { View, Text } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'

import { useState } from 'react'

import { registerRequest } from '@/apis/login';

import './index.less';

export default function SignUp (props: any) {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const handlePhoneChange = (v: string) => {
        setPhone(v);
    }
    const handleEmailChange = (v: string) => {
        setEmail(v);
    }
    const handlePasswordChange = (v: string) => {
        setPassword(v);
    }
    const handleConfirmPwdChange = (v: string) => {
        setConfirmPwd(v);
    }
    const signUp = async () => {
        const res = await registerRequest({
            name: phone,
            password,
            email
        })
        // TODO: 处理请求结果
        if (res) {}
        props.cancel();
    }

    const goBack = () => {
        props.cancel();
    }

    return (
        <View className='m-4'>
          <AtForm>

            <AtInput className='mt-4' name='phone' title='姓名' value={phone} onChange={handlePhoneChange} />
            <AtInput className='mt-4' name='phone' title='邮箱' value={email} onChange={handleEmailChange} />
            <AtInput className='mt-4' name='password' title='密码' value={password} onChange={handlePasswordChange} />
            <AtInput className='mt-4' name='password' title='确认密码' value={confirmPwd} onChange={handleConfirmPwdChange} />

            <AtButton  className='mt-4 bg-gray-500 text-white font-bold text-lg flex items-center justify-center' circle onClick={signUp} >
                <Text>注册</Text>
            </AtButton>
            <AtButton  className='mt-4 bg-gray-500 text-white font-bold text-lg flex items-center justify-center' circle onClick={goBack} >
                <Text>返回</Text>
            </AtButton>
          </AtForm>
        </View>
    )
}