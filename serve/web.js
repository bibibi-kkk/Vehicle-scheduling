const express = require('express');

const admin = express.Router();

const db = require('../connect')

//后台登录
admin.post('/login',(req,res) => {
	let {phoneNum, password} = req.body
	let sql = `select * FROM user where tel = ${phoneNum}`
  db.query(sql, (err, result) => {
		if(err) throw err;
		if(result[0] && (result[0].role === 0 || result[0].role === 1)) {
			//用户存在,且为admin或调度管理员
			if(password === result[0].password) {
				res.json({
				msg: '登录成功',
				user: result[0]
				})
			} else {
					res.status(400).json({
					msg: '登录失败，密码错误'
				})
			}	
		} else {
				res.status(400).json({
					msg: '登录失败，用户不存在'
				})
		}
  })
})

//后台注册
admin.post('/register', (req,res) => {
	let {phoneNum, nickNme, password} = req.body
	let sql = `select * FROM user where tel = ${phoneNum}`
  db.query(sql, (err, result) => {
		if(result[0]) {
			//手机号已被注册

res.send('存在')
		} else {
res.send('可注册')
		}
	})
})

module.exports = admin;
