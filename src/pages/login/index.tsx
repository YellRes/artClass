import { useLoad, redirectTo, showToast, setStorageSync } from "@tarojs/taro";

// 组件
import { View, Text, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import SignUp from './SignUp'

// 方法
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import {userState } from '@/components/Auth/authCheck'
import { loginRequest } from '@/apis/login'

// ts type
import { LoginProps } from './index.d'
import loginImg from '@/assets/images/login/login.jpg'
import './index.less'

export default function Index(props: LoginProps) {
  const { redirectPath } = props
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loginState, setLoginState] = useRecoilState(userState)
  const [showRegister, setShowRegister] = useState(false)
  useLoad(() => {
    console.log('Page loaded.')
  })

  const handlePhoneChange = (val) => { 
    setPhone(val)
  }

  const handlePasswordChange = (val) => { 
    setPassword(val)
  }

  // 验证表单
  const validateForm = () => new Promise((res, rej) => { 
    if (!phone) { 
      showToast({title: '请输入手机号', icon: "none",})
      return rej(false)
    }

    if (!password) { 
      showToast({title: '请输入密码', icon: "none",})
      return rej(false)
    }

    return res(true)
  })

  // 登录
  const toLogin = async () => { 

    // await validateForm()
    try { 

      let res = await loginRequest({
        name: phone,
        password
      })

      setLoginState({
        token: res
      })
      setStorageSync('token', res)

      if (process.env.TARO_ENV === 'h5') {
        window.location.reload()
      } else { 
        redirectTo({
          url: redirectPath || 'pages/index/index'
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const SignUpCancel = () => {
    setShowRegister(false)
  }

  return (
    <View className='index'>
      <Image src={loginImg}  />
      <View className='text-center text-slate-500 text-lg font-bold'>
        <Text  >闳约深美  美美与共</Text>
      </View>

      {!showRegister ? <View className='m-4 '>

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
        </View>
        <View className='text-center text-sm flex flex-row-reverse relative' onClick={() => setShowRegister(true)}>
            <Text>注册</Text>
        </View>

      </View> :
      <SignUp cancel={SignUpCancel} />}
    </View>
  )
}

