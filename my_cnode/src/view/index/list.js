import React, { Component } from 'react';
import data from './data'
import { List, Avatar } from "antd"
import { Link} from "react-router-dom"
import TxtTag from "./txtTag"
import { connect } from "react-redux"
import axios from "axios"
class IndexList extends Component {
  constructor (arg) {
    super(arg)
    this.state = {
      page: 1
    }
    this.getData(this.props.tab)
  }
  shouldComponentUpdate (nextProps) {
    if(this.props.tab !== nextProps.tab) {
      this.getData(nextProps.tab)
      return false
    }
    return true
  }
  getData (tab) {
    this.props.dispatch((dispatch) => {
      axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${this.state.page}&limit=15`)
      .then((res) => {
        dispatch({
          type:'List_UPDATA_SUCC',
          data: data.data
        })
      }).catch((error)=>{
        console.log(error)
        dispatch({
          type:'List_UPDATA_ERR',
          data: []
        })
      })
    })
  }
  render () {
    let { loading, data} = this.props
    return (
      <List 
        loading = {loading}
        dataSource={ data }
        renderItem = {item => (
          <List.Item actions={['回复:' + item.reply_count, '访问: '+ item.visit_count ]}>
          {
            <List.Item.Meta
              avatar={ <Avatar src={item.author.avatar_url}/>}
              title={<Link to={"/details/" + item.id}><TxtTag/>{item.title}</Link>}
              description={<p>
                <Link to={"/user/" + item.author.loginname}>{item.author.loginname}</Link>
                发表于：{item.create_at.split('T')[0]}
              </p>}
            />
          }
          </List.Item>
        )}
      ></List>
    )
  }
}
export default connect(state => state.list)(IndexList)
