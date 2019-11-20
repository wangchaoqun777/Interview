import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './Header'
import Content from './Content';
import PropTypes from 'prop-types'
import * as serviceWorker from './serviceWorker';


function createStore (reduce) {
  let state = null
  const listeners = []
  const subscribe = (lsitenter) => listeners.push(lsitenter)
  const getState = () => state
  const dispatch = (action) => {
    state = reduce(state, action)
    listeners.forEach( (listener)=> listener())
  }
  dispatch({})
  return { getState, dispatch, subscribe }
}

const themeRuducer = (state, action) => {
  if (!state) return {
    themeColor : 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}
const store = createStore(themeRuducer)
class Index extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return { store }
  }
  render() { 
    return ( 
      <div>
        <Header/>
        <Content/>
      </div>
     );
  }
}
 
export default Index;
ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
