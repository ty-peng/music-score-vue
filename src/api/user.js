/**
 * 用户接口列表
 */

import base from './base' // 导入接口域名列表
import axios from './http' // 导入http中创建的axios实例
import { UPDATE_TYPE } from './../enums/enums'

const user = {
  // 登录，post提交token
  login (params) {
    // TODO 加密
    return axios.post(`${base.baseUrl}/login`, params)
  },
  // 注销（让服务器注销token）
  logout (params) {
    return axios.post(`${base.baseUrl}/logout`, params)
  },
  // 注册
  register (params) {
    return axios.post(`${base.baseUrl}/register`, params)
  },
  // 检查用户名/手机/邮箱是否已被使用
  checkAccount ({ account, type }) {
    return axios.get(`${base.baseUrl}/user/accountCheck`, {
      params: {
        account: account,
        type: type
      }
    })
  },
  // 加载用户信息
  loadUser (id) {
    return axios.get(`${base.baseUrl}/user/${id}`)
  },
  // 加载用户信息
  loadUserInfo (id) {
    return axios.get(`${base.baseUrl}/userInfo/${id}`)
  },
  // 更新用户信息
  updateUser (updatedUserInfo) {
    let id = updatedUserInfo.id
    // patch 部分更新
    if (updatedUserInfo.updateType === UPDATE_TYPE['userInfo']) {
      return axios.patch(`${base.baseUrl}/userInfo/${id}`, updatedUserInfo)
    } else if (updatedUserInfo.updateType === UPDATE_TYPE['userSetting']) {
      return axios.patch(`${base.baseUrl}/user/${id}`, updatedUserInfo)
    }
  },
  // 加载用户收藏
  loadCollections (userId, pageQo) {
    return axios.get(`${base.baseUrl}/user/${userId}/collection`, {
      params: pageQo
    })
  },
  // 加载收藏id
  loadCollectId (userId, scoreId) {
    return axios.get(`${base.baseUrl}/user/${userId}/collectStatus`, {
      params: { scoreId: scoreId }
    })
  },
  // 添加收藏
  collect (userId, userCollect) {
    return axios.post(`${base.baseUrl}/user/${userId}/collection`, userCollect)
  },
  // 取消收藏 id: 收藏表id
  cancelCollect (userId, id) {
    return axios.delete(`${base.baseUrl}/user/${userId}/collection/${id}`)
  },
  // 批量取消收藏 ids: 收藏表id数组
  cancelCollections (userId, ids) {
    return axios.put(`${base.baseUrl}/user/${userId}/collection`, ids)
  },
  // 加载用户上传
  loadUploads (userId, pageQo) {
    return axios.get(`${base.baseUrl}/user/${userId}/uploads`, {
      params: pageQo
    })
  },
  // 修改已上传曲谱
  editUploads (userId, score) {
    return axios.patch(
      `${base.baseUrl}/user/${userId}/uploads/${score.id}`,
      score
    )
  },
  // 批量删除已上传曲谱
  delUploads (userId, ids) {
    return axios.put(`${base.baseUrl}/user/${userId}/uploads`, ids)
  }
}

export default user
