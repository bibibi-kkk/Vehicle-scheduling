const express = require('express')
const admin = express.Router()
const db = require('../connect')
const bcrypt = require('bcrypt');

//后台登录
admin.post('/login',(req,res) => {
	let {phoneNum, password} = req.body
	let sql = `select * FROM user where tel = ${phoneNum}`
  db.query(sql, async (err, result) => {
		if(err) throw err;
		if(result[0] && (result[0].role === 0 || result[0].role === 1)) {
			//用户存在,且为admin或调度管理员
			const isEqual = await bcrypt.compare(password,result[0].password);
			if(isEqual) {
				res.json({
				success: true,
				msg: '登录成功',
				user: result[0]
				})
			} else {
					res.status(400)
					.json({
					err: true,
					msg: '登录失败，密码错误'
				})
			}	
		} else {
				res.status(400).json({
					err: true,
					msg: '登录失败，用户不存在'
				})
		}
  })
})

//后台注册
admin.post('/register', (req,res) => {
	let {phoneNum, nickName, password} = req.body
	let sql = `select * FROM user where tel = ${phoneNum}`
  db.query(sql, async (err, result) => {
		if(err) throw err;
		if(result[0]) {
			//手机号已被注册
			res.status(400).json({ err: true, msg: '该手机号已被注册'})
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashPass = await bcrypt.hash(password, salt);
			let sql = `INSERT INTO user (tel, nickname, password, role) VALUES ('${phoneNum}','${nickName}', '${hashPass}', '1');`
			db.query(sql, (err, result) => {
				if(err) throw err;
				if(result) res.json({
					success: true,
					msg: '注册成功'
				})
			})
		}
	})
})

//消息
admin.get('/message', (req,res) => {
	let sql = 'select * FROM message'
	db.query(sql, async (err, result) => {
		if(err) throw err;
		res.json(result)
	})
})

module.exports = admin;
