import React, { Component } from 'react';
import PropTypes from 'prop-types'
// import { connect } from './react-redux'
import { connect } from 'react-redux'
class ThemeSwitch extends Component {
  // static contextTypes = {
  //   store: PropTypes.object
  // }
  // static PropTypes = {
  //   themeColor: PropTypes.string,
  //   onSwitchColor: PropTypes.func
  // }
  // constructor () {
  //   super()
  //   this.state = { themeColor: '' }
  // }

  // componentWillMount () {
  //   this._updateThemeColor()
  //   const { store } = this.context
  //   store.subscribe(() => this._updateThemeColor())
  // }

  // _updateThemeColor () {
  //   const { store } = this.context
  //   const state = store.getState()
  //   this.setState({ themeColor: state.themeColor })
  // }
  handleSwitchColor (color) {
    // const { store } = this.context 
    // store.dispatch({
    //   type: 'CHANGE_COLOR',
    //   themeColor: color
    // })
    if(this.props.onSwitchColor) {
      this.props.onSwitchColor(color)
    }
  }
  render() { 
    return ( 
      <div>
      <button style={{ color: this.props.themeColor }} onClick={this.handleSwitchColor.bind(this, 'red')}>red</button>
      <button style={{ color: this.props.themeColor }} onClick={this.handleSwitchColor.bind(this, 'blue')}>blue</button>
      </div>
     );
  }

}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({'type': 'CHANGE_COLOR', themeColor: color})
    }
  }
}
ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)
 
export default ThemeSwitch;