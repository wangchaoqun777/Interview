import React, { Component } from 'react';
import { Card, Avatar, List } from 'antd';
import { Link } from "react-router-dom"
export default class ReplyList extends Component {
  render() {
    let { replies, replyCount} = this.props
    return (
      <Card
        title={replyCount + '条回复'}
        type="inner"
      >
        <List
          dataSource={replies}
          itemLayout="vertical"
          renderItem={(item)=>(
            <List.Item
              key={item.id}
              extra={item.ups.length > 0 ? <span>有{item.ups.length}个人觉得很赞</span>: ''}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar_url}/>}
                description={<Link to="/user"></Link>}
              >
              </List.Item.Meta>
            </List.Item>
          )}
        ></List>
      </Card>
    );
  }
}