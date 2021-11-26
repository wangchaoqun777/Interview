// import request from '@/utils/request'
import axios from 'axios'

import request from '@/axios'

export async function logout() {
  const res = await request.get('/logout')
  return res?.data
}


// @Summary 用户登录
// @Produce  application/json
// @Param data body {account_name:"string",password:"string"}
// @Router /base/login [post]
export async function login(data: any) {
  const res = await request.post('/login', data)
  return res?.data
}

// 获取内容列表筛选条件
export async function getFilterList() {
  const res = await request.get('/data/filter')
  return res?.data
}

export async function logAdd(data:any) {
  const res = await request.get('/home/recommendLog/recommendLogAdd',data)
  return res?.data
}


const pending:any = {
  token: ''
}
/**
 * 获取token
 */
// export const getToken = () => {
//   if (pending.token) return pending.token
//   pending.token = request.get('/home', { responseType: 'text' }).then(({ data }:any) => {
//     delete pending.token
//     if (/name="?token"?\s*content="?([^>\s"]+)"?/.test(data)) return RegExp.$1
//     return ''
//   }).catch(() => {
//     delete pending.token
//   })
//   return pending.token
// }
export const getToken = async() => {
  const res = await request.get('/token')
  return res?.data
}

export async function getDetail(data: any) {
  const res = await request.post('/data/index', data)
  return res?.data
}

export async function getMapJson() {
  const data = await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/110000_full.json')
  return data
}