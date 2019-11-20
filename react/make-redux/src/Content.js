import React, { Component } from 'react';
import ThemeSwitch from './ThemeSwitch';
import PropTypes from 'prop-types'
import { connect } from './react-redux'
class Content extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }

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
  render() { 
    return ( 
      <div>
      <h1 style={{ color: this.props.themeColor }}>小书内容</h1>
      <ThemeSwitch/>
      </div>
     );
  }
}
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
Content = connect(mapStateToProps)(Content)
 
export default Content;