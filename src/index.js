import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import app from './page/reducer/app'
import ReactDOM from 'react-dom'
import './index.css'
import App from './page/App'
const store = createStore(app)
const Index = () => (
    <Provider store={store}>
        <App/>
    </Provider>
)
ReactDOM.render(<Index />, document.getElementById('root'))
