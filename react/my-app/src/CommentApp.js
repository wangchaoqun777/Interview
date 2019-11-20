import React, { Component } from 'react'; // imrc
import CommentInput from "./CommentInput"
import CommentList from "./CommentList"
import WrapWithLoadData from './wrapWithLoadData'
const comments = React.createContext({
  comments: []
})
class CommentApp extends Component { //cc
  constructor (props) {
    super(props)
    this.state = {
      comments : props.data
    }
  }
  // componentWillMount () {
  //   this._loadComments()
  // }
  // _loadComments () {
  //   let comments = localStorage.getItem('comments')
    
  //   if(comments){
  //     comments = JSON.parse(comments)
  //     console.log(comments)
  //     this.setState({comments})
  //     console.log(this.state.comments)
  //   }
  // }
  // _saveComments (comments) {
  //   localStorage.setItem('comments', JSON.stringify(comments))
  // }
  handleDeleteComment (index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({comments})
    // this._saveComments(comments)
    this.props.saveData(comments)
  }
  handleSubmitComment (c) {
    if(!c) return
    if(!c.username) return alert('请输入用户名')
    if(!c.content) return alert('请输入评论内容')
    const comments = this.state.comments
    comments.push(c)
    this.setState({
      comments
    })
    // this._saveComments(comments)
    this.props.saveData(comments)
  }
  render() { 
    return (
       <div className="wrapper">
         <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
         <CommentList comments={this.state.comments} onDeleteCommment={this.handleDeleteComment.bind(this)}/>
       </div>
      );
  }
}
CommentApp = WrapWithLoadData(CommentApp, 'comments')
export default CommentApp;
