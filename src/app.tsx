import { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'mobx-react'

import counterStore from './store/counter'

import './app.scss'
import { autoLogin } from './services/user/wechat-login'

const store = {
  counterStore
}

class App extends Component {
  componentDidMount() {
    // autoLogin()
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
