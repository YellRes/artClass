// 官方推荐的 recoil https://taro-docs.jd.com/docs/guide#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86
import { getCurrentPages } from '@tarojs/taro'
import Login from '@/pages/login/index'
import { useRecoilValue } from 'recoil'
import { isLoggedInState } from './authCheck'

// 用此组件包括下 需要登录的组件
// 查询当前用户是否登录
// 如果没有则跳转登录页面
export default function Index({children}) { 
    const isLoggedIn = useRecoilValue(isLoggedInState)
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
 
    return (
        
            <div>
            {isLoggedIn ? children : <Login redirectPath={currentPage.route} />}
            </div>
    )
}