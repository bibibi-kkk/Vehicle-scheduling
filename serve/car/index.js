const db = require('../../connect')
const express = require('express')
const router = express.Router()

// 获取车辆表个数
router.post('/getCarTotal', (req,res) => {
	try {
		let sql = `select COUNT(*) total FROM car`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, total: result[0].total});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 获取全部车辆
router.post('/getCar/all', (req,res) => {
	try {
		let sql = `select * FROM car`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, result: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 获取车辆分类
router.get('/getClass', (req,res) => {
	try {
		let sql = 'select * FROM car_class';
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 根据车辆分类获取车辆
router.post('/getCar/class', (req,res) => {
	try {
		const className = req.body.class
		let sql = `select * FROM car WHERE class = '${className}'`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 根据车辆id获取车辆
router.post('/getCar/id', (req,res) => {
	try {
		const id = req.body.id
		let sql = `select * FROM car WHERE id = '${id}'`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 根据车辆id获取车辆 链表查询class
router.post('/getCarAndClass/id', (req,res) => {
	try {
		const id = req.body.id
		let sql = `SELECT a.id, a.carId, a.img, a.type, a.class, a.carryNum, b.name class_name
		FROM car a
		LEFT JOIN car_class b
		ON a.class=b.id
		where a.id = ${id}`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 车辆表分页查询
router.post('/getCar', (req,res) => {
	try {
		const { current, pageSize } = req.body;
		const sort = 'createTime DESC';
		const beginRow = ( current - 1) * pageSize;
		let sql = `select * FROM car ORDER BY ${sort} LIMIT ${beginRow},${pageSize};`;
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
		const{ current, pageSize, item, data } = req.body;
		const sort = 'createTime DESC';
		const beginRow = ( current - 1) * pageSize;
		let sql = `SELECT * from car WHERE ${item} like "%${data}%" ORDER BY ${sort} LIMIT ${beginRow},${pageSize};`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			let sql2 = `SELECT * from car WHERE ${item} like "%${data}%"`;
			db.query(sql2, (err, total) => {
				res.json({code: 0, data: result, total: total.length});
			})
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 增加车辆
router.post('/add', (req,res) => {
	try {
		const data = req.body.data;
		let colums = ''
		let val = ''
		let index = 1
		for(const i in data) {
			const end = index < Object.keys(data).length ? ',' : ''
			colums = colums + `${i}${end}`
			val = `${val}` + `'${data[i]}'${end}`
			index++
		}
		let sql = `insert into car (${colums}) values (${val});`;
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
			if (data[i]) {
				const end = index < Object.keys(data).length ? ',' : ''
				set = set + `${i}='${data[i]}'${end}`
				index++
			}
		}
		let sql = `UPDATE car SET ${set}	WHERE id = ${id};`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: '修改成功'});
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 删除车辆
router.post('/delete', (req,res) => {
	try {
		const id = req.body.id;
		let sql = `DELETE FROM car WHERE id = '${id}'`;
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