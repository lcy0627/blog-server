/*
 * @Author: lcy 1035601195@qq.com
 * @Date: 2023-03-01 16:20:11
 * @LastEditors: lcy 1035601195@qq.com
 * @LastEditTime: 2023-03-03 22:22:43
 * @FilePath: \blog-server\routes\getPubKey.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const { getPublicKey } = require('../core/rsaControl')
const router = express.Router();
const Key = require('../models/Key');
const assert = require('http-assert');

/*GET /keys */
router.get('/', async function (req, res, next) {
  let result = await Key.findOne()
  res.status(200).send({
    message: 'ok',
    data: {
      pubKey: result.content
    }
  })
});

module.exports = router;
