import { useLoad, redirectTo } from "@tarojs/taro";

// 组件
import { View, Text, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'

// 方法
import { useState } from 'react'

import { loginRequest } from '@/apis/login'
import loginImg from '@/assets/images/login/login.jpg'


import './index.less'

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

  // 验证表单
  const validateForm = () => new Promise()

  // 登录
  const toLogin = async () => { 

    await validateForm()
    try { 
      await loginRequest({
        name: phone,
        password
      })

      redirectTo({
        url: '/pages/index/index'
      })
    } catch (e) {
      console.log(e)
    }
    

  
  }

  return (
    <View className='index'>
      <Image src={loginImg}  />
      <View className='text-center text-slate-500 text-lg font-bold'>
        <Text  >闳约深美  美美与共</Text>
      </View>

      <View className='m-4 '>

        <View className='text-xl font-bold text-center text-slate-500' >
          登录
        </View>

        <View className='m-4'>
          <AtForm>

            <AtInput className='mt-4' name='phone' title='姓名' value={phone} onChange={handlePhoneChange} />
            <AtInput className='mt-4' name='password' title='密码' value={password} onChange={handlePasswordChange} />

            <AtButton  className='mt-4 bg-gray-500 text-white font-bold text-lg flex items-center justify-center' circle onClick={toLogin} >登录</AtButton>
          </AtForm>
        </View>

        <View className='text-center text-sm flex flex-row-reverse relative'>
          <Text className='absolute left-1/2 -translate-x-1/2'>忘记密码</Text> 
          <Text>注册</Text>
        </View>
      </View>
    </View>
  )
}

