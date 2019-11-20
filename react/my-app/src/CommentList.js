import React, { Component } from 'react';
import Comment from './Comment'
class CommenList extends Component {
  static comments = []
  handleDeleteComment (index) {
    if(this.props.onDeleteCommment) {
      this.props.onDeleteCommment(index)
    }
  }
  render() { 
    return (
      <div>
        {this.props.comments.map((item, i) => <Comment comment={item} key={i} index={i} onDeleteCommment={this.handleDeleteComment.bind(this)}/>)}
      </div>
     )
  }
}
 
export default CommenList;