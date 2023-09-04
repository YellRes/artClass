import { View, Text } from '@tarojs/components'
import { useLoad, navigateTo} from '@tarojs/taro'
import { useState } from 'react'
import { RecoilRoot } from 'recoil'
import Auth from "@/components/Auth/index";
import './index.less'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { AtTabBar } from 'taro-ui'


import Home from '../home';
import User from '../user';

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
    setTimeout(() => {
      setInit(true)
    }, 1000)
  })

  const [init, setInit] = useState(false);

  // Route
  const MyRoute = () => {

    const loader = () => {
      console.log('!!')
    }

    return (

      <RecoilRoot>
        <BrowserRouter basename='pages/index/index'>
          <Routes>
            <Auth>
              <Route path='/' element={<Layout />}>
                  <Route index element={<Home />}></Route>
                  <Route path='user' element={<User />}></Route>
              </Route>
            </Auth>
            </Routes>
          </BrowserRouter>
      </RecoilRoot>
    )
  }

  // Layout
  const Layout = () => {

    const [curRoute, setCurRoute] = useState(0);

    const cusRoutes = [
      { title: 'Home', path: '/' },
      { title: 'User', path: '/user' },
    ]

    const goRoute = (v) => {
      setCurRoute(v);
    }
    return (
      <View className='index-children-page'>
          <Outlet />
          <Navigate to={cusRoutes[curRoute].path} replace></Navigate>
          <AtTabBar
            fixed
            tabList={cusRoutes}
            onClick={goRoute}
            current={curRoute}
          ></AtTabBar>
      </View>
    )
  }

  return (
    <View className='index-page'>
      {
        !init ?
        <Text>Loading...</Text> :
        <MyRoute />
      }
    </View>
  )
}
