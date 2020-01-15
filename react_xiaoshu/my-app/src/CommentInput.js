import React, { Component } from 'react';

class CommenInput extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }
  componentWillMount () {
    const usename = localStorage.getItem('username')
    if(usename) {
      this.setState({'username': usename})
    }
  }
  componentDidMount () {
    this.textarea.focus()
  }
  handleNameChange (e) {
    this.setState({
      username: e.target.value
    })
  }

  _haveSaveName (username) {
    localStorage.setItem('username', username)
  }
  handleNameChangeBlur(e) {
    this._haveSaveName(e.target.value)
  }
  handleContentChange (e) {
    this.setState({
      content: e.target.value
    })
  }
  handleSubmit () {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({
        username, 
        content,
        createdTime: +new Date()
      })
    }
    this.setState({content: ''})
  }
  render() { 
    return ( 
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              onChange={this.handleNameChange.bind(this)}
              onBlur= {this.handleNameChangeBlur.bind(this)}
              value={ this.state.username}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea  
              ref={(textarea) => this.textarea = textarea}
              onChange={this.handleContentChange.bind(this)}
              value={ this.state.content}/>
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
     )
  }
}
 
export default CommenInput;