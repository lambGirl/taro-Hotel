import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import Home from './pages/index'
import dva from './utils/dva'
import models from './models'
import { Provider } from '@tarojs/redux'

import './app.less'


const dvaApp = dva.createApp({
    initialState: {},
    models: models,
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/orderlist/index',
      'pages/orderdetail/index',
      'pages/hotellist/index',
      'pages/city/index'
    ],
    window: {
        "navigationStyle": "custom",
    }
  }

  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
