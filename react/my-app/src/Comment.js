import React, { Component } from 'react';
class Comment extends Component {
  constructor () {
    super()
    this.state = {
      timeStrig: ''
    }
  }
  componentWillMount() {
    this._updateTime()
    this._timer = setInterval(()=> {
      this._updateTime()
    },1000)
  }

  componentWillUnmount(){
    clearInterval(this._timer)
  }
  _updateTime() {
    const comment = this.props.comment
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState({
      timeStrig: duration > 60
      ? `${Math.round(duration/60)}分钟前`
      : `${Math.round(Math.max(duration, 1))}秒前`
    })
  }
  handleDeleteCommment () {
    if(this.props.onDeleteCommment){
      this.props.onDeleteCommment(this.props.index)
    }
  }
  _getProcessedContent(content) {
    return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }
  render() { 
    return ( 
      <div className='comment'>
      <div className='comment-user'>
        <span>{this.props.comment.username} </span>：
      </div>
      <p dangerouslySetInnerHTML={{__html: this._getProcessedContent(this.props.comment.content) }} />
      <span className='comment-createdtime'>
        { this.state.timeStrig}
      </span>
      <span 
      onClick={this.handleDeleteCommment.bind(this)}
      className='comment-delete'>删除</span>
    </div>
     )
  }
}
 
export default Comment;