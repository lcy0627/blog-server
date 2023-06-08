/*
 * @Author: lcy 1035601195@qq.com
 * @Date: 2023-03-01 16:20:26
 * @LastEditors: lcy 1035601195@qq.com
 * @LastEditTime: 2023-03-30 14:12:27
 * @FilePath: \blog-server\routes\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Article = require('../models/Article')
const Column = require('../models/Column')
const assert = require('http-assert')
const qs = require('qs')




router.put('/', async (req, res, next) => {
  let putData = req.body
  let isPass = req.isPass //鉴权结果
  let userId = req._id //userID
  
  try {
    assert(isPass, 400, "无权修改")
    let result = await User.findByIdAndUpdate(userId, putData, { runValidators: true, new: true })
    res.status(200).send({
      message: '修改成功'
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//查询资源详情
router.get('/', async (req, res, next) => {
  let _id = req._id
  try {
    let userResult = await User.findById(_id)
    let articleCount = await Article.find({ author: _id }).count()
    let columnCount = await Column.find({ uid: _id }).count()
    userResult = userResult.toJSON()
    userResult.articleCount = articleCount
    userResult.columnCount = columnCount
    res.status(200).send({
      message: '查询成功',
      data: userResult
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})


module.exports = router

