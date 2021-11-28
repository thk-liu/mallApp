import { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'mobx-react'

import counterStore from './store/counter'

import './app.scss'
import { autoLogin } from './services/user/wechat-login'
import { getSeesionKey } from './services/wechat'

const store = {
  counterStore
}

class App extends Component {
  componentDidMount() {
    // autoLogin()
    // Taro.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       getSeesionKey(res.code).then(response => {
    //         console.log('getSeesionKey', response)
    //       });
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })

  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
