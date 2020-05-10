
const db = require('../../connect')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');

// 根据用户角色 获取用户表个数
router.post('/getUserTotal', (req,res) => {
	try {
		const role = req.body.role;
		let sql = `select COUNT(*) total FROM user WHERE role = ${role}`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, total: result[0].total});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 根据用户id获取信息
router.post('/getUser/id', (req,res) => {
	try {
		const id = req.body.id
		let sql = `select * FROM user WHERE id = '${id}'`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 根据用户角色 分页查询
router.post('/getUser', (req,res) => {
	try {
		const { current, pageSize, role } = req.body;
		const sort = 'createTime DESC';
		const beginRow = ( current - 1) * pageSize;
		let sql = `select * FROM user WHERE role = ${role} ORDER BY ${sort} LIMIT ${beginRow},${pageSize};`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 根据角色获取全部用户
router.post('/getUser/role', (req,res) => {
	try {
		const { role } = req.body;
		const sort = 'createTime DESC';
		let sql = `select * FROM user WHERE role = ${role} ORDER BY ${sort}`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 搜索
router.post('/search', (req,res) => {
	try {
		const{ current, pageSize, item, data, role } = req.body;
		const sort = 'createTime DESC';
		const beginRow = ( current - 1) * pageSize;
		let sql = `SELECT * from user WHERE ${item} like "%${data}%" and role = ${role} ORDER BY ${sort} LIMIT ${beginRow},${pageSize};`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			let sql2 = `SELECT * from user WHERE ${item} like "%${data}%" and role = ${role}`;
			db.query(sql2, (err, total) => {
				res.json({code: 0, data: result, total: total.length});
			})
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 增
router.post('/add', async (req,res) => {
	try {
		const data = req.body.data;
		let colums = ''
		let val = ''
		let index = 1
		for(const i in data) {
			// const end = index < Object.keys(data).length ? ',' : ''
			const end = ','
			colums = colums + `${i}${end}`
			val = val + `'${data[i]}'${end}`
			index++
		}
		const salt = await bcrypt.genSalt(10);
		const hashPass = await bcrypt.hash('123456', salt);
		colums = colums + 'password'
		val = val + `'${hashPass}'`
		let sql = `insert into user (${colums}) values (${val});`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: '增加成功'});
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 改
router.post('/update', (req,res) => {
	try {
		const{ id, data }= req.body;
		let set = ''
		let index = 1
		for(const i in data) {
			if (data[i] !== undefined) {
				const end = index < Object.keys(data).length ? ',' : ''
				set = set + `${i}='${data[i]}'${end}`
				index++
			}
		}
		let sql = `UPDATE user SET ${set} WHERE id = ${id};`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: '修改成功'});
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 删除用户
router.post('/delete', (req,res) => {
	try {
		const id = req.body.id;
		let sql = `DELETE FROM user WHERE id = '${id}'`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: '删除成功'});
	})
	}
	catch (e) {
		res.json(e)
	}
})

module.exports = router;