import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import loginImg from '@/assets/images/login/login.jpg'

import './index.less'
// TODO: 登录成功后的跳转

export default function Index() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  useLoad(() => {
    console.log('Page loaded.')
  })

  // TODO: 需要ref来优化
  const handlePhoneChange = (val) => { 
    setPhone(val)
  }

  const handlePasswordChange = (val) => { 
    setPassword(val)
  }

  return (
    <View className='index'>
      <Image src={loginImg} />
      <View className='text-center text-slate-500 text-lg font-bold'>
        <Text  >闳约深美  美美与共</Text>
      </View>

      <View className='mt-4'>

        <View className='text-xl font-bold text-center text-slate-500' >
          登录
        </View>

        <View className='m-4'>
          <AtForm>

            <AtInput className='mt-4' name='phone' title='手机号' value={phone} onChange={handlePhoneChange} />
            <AtInput className='mt-4' name='password' title='密码' value={password} onChange={handlePasswordChange} />

            <AtButton  className='mt-4 bg-gray-500 text-white font-bold text-lg flex items-center justify-center' circle disabled>登录</AtButton>
          </AtForm>
        </View>

        <View className='text-center text-sm'>
          忘记密码
        </View>
      </View>
    </View>
  )
}

// dev 环境的px 无需要转化成rpx
