const db = require('../../connect')
const express = require('express')
const router = express.Router()

// 获取订单表个数
router.post('/getorderTotal', (req,res) => {
	try {
		const state = req.body.state
		let stateArr = ''
		state.forEach((item, index) => {
			index < state.length - 1 ? stateArr = stateArr + `${item},` : stateArr = stateArr + item
		})
		let sql = `select COUNT(*) total FROM orders WHERE state in (${state})`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, total: result[0].total});
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 获取司机id获取今天之后的订单
router.post('/getOrder/driver/departureTime', (req,res) => {
	const id = req.body.driverId
	let sql = `SELECT departureTime, state, id FROM vehicle_scheduli.orders where driver=${id} and departureTime > curdate() and (state = 1 or state = 2) ORDER BY departureTime;`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
		})
})

// 获取司机待确定订单
// router.post('/getOrder/driver/departureTime', (req,res) => {
// 	const id = req.body.driverId
// 	let sql = `SELECT * FROM vehicle_scheduli.orders where driver=${id} and state = 1 ;`;
// 		db.query(sql, (err, result) => {
// 			if(err) throw err;
// 			res.json({code: 0, data: result});
// 		})
// })

// 获取司机完成，待出行，待确认个数
router.post('/getOrder/driver/num', async function (req,res) {
	try {
		const id = req.body.id
		const data = []
		db.query(`SELECT count(*) comply FROM vehicle_scheduli.orders where driver=${id} and state = 6;`, (err, comply) => {
			if(err) throw err;
			data.push(comply)
			db.query(`SELECT count(*) togo FROM vehicle_scheduli.orders where driver=${id} and state = 2;`, (err, togo) => {
				if(err) throw err;
				data.push(togo)
				db.query(`SELECT count(*) toconfirm FROM vehicle_scheduli.orders where driver=${id} and state = 1;`, (err, toconfirm) => {
					if(err) throw err;
					data.push(toconfirm)
					res.json({code: 0, data: data})
				})
			})
		})
	}
	catch(e) {
		res.json({code: 1, error: e})
	}
})

// 获取用户完成，待出行，待审核个数
router.post('/getOrder/applyer/num', async function (req,res) {
	try {
		const id = req.body.id
		const data = []
		db.query(`SELECT count(*) comply FROM vehicle_scheduli.orders where applyUser=${id} and state = 6;`, (err, comply) => {
			if(err) throw err;
			data.push(comply)
			db.query(`SELECT count(*) togo FROM vehicle_scheduli.orders where applyUser=${id} and state = 2;`, (err, togo) => {
				if(err) throw err;
				data.push(togo)
				db.query(`SELECT count(*) toconfirm FROM vehicle_scheduli.orders where applyUser=${id} and state = 0;`, (err, toconfirm) => {
					if(err) throw err;
					data.push(toconfirm)
					res.json({code: 0, data: data})
				})
			})
		})
	}
	catch(e) {
		res.json({code: 1, error: e})
	}
})
// 根据用户id 和用户角色 state 获取订单表
router.post('/getOrder/user', (req,res) => {
	try {
		const { id, role, state, date } = req.body
		const STATE = state === '' ? '' : `and a.state = ${state}`
		const DATE = date === '' ? '' : `and date(departureTime) = '${date}'`
		const ROLE = role === 2 ? 'applyUser' : 'driver'
		const order = role === 2 ? 'ORDER BY a.createTime desc' : 'ORDER BY a.departureTime desc'
		// console.log(ROLE)
		let sql = `SELECT a.id, a.applyUser, a.createTime, a.departure, a.destination, a.departureTime, a.carType, a.approvalUser, a.approvalTime, a.driver, a.car, a.state, b.state_name
		FROM orders a
		LEFT JOIN orders_state b
		ON a.state=b.state
		where a.${ROLE} = ${id} ${STATE} ${DATE}
		${order} `;
		// console.log(sql)
		// let sql = `select * FROM orders WHERE ${ROLE} = ${id} ${STATE} ${DATE}`;
		// console.log(sql)
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 根据id获取订单
router.post('/getOrder/id', async (req,res) => {
	try {
		const id = req.body.orderId
		let sql = `select * FROM orders WHERE id = ${id}`;
		db.query(sql, (err, result) => {
			res.json({code: 0, data: result});
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 根据车辆 获取订单
router.post('/getOrder/car', async (req,res) => {
	try {
		const { car }= req.body
		let sql = `select * FROM orders WHERE car = ${car} ORDER BY departureTime`;
		db.query(sql, (err, result) => {
			res.json({code: 0, data: result});
		})
	}
	catch (e) {
		res.json(e)
	}
})


// 根据车辆，出发日 获取订单
router.post('/getOrder/car/date', async (req,res) => {
	try {
		const { car, date }= req.body
		let sql = `select * FROM orders WHERE car = ${car} and date(departureTime) = '${date}' ORDER BY departureTime`;
		db.query(sql, (err, result) => {
			res.json({code: 0, data: result});
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 根据司机，出发日 获取订单
router.post('/getOrder/driver/date', (req,res) => {
	try {
		const { driver, date } = req.body
		let sql = `select * FROM orders WHERE driver = ${driver} and date(departureTime) = '${date}' ORDER BY departureTime`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 订单表分页查询
router.post('/getorder', (req,res) => {
	try {
		const { current, pageSize, state } = req.body;
		let stateArr = ''
		state.forEach((item, index) => {
			index < state.length - 1 ? stateArr = stateArr + `${item},` : stateArr = stateArr + item
		})
		const sort = 'createTime DESC';
		const beginRow = ( current - 1) * pageSize;
		let sql = `
			SELECT A.id,A.applyUser,A.createTime,A.departure,A.destination,A.approvalUser,A.approvalTime,A.driver,A.car,A.carryNum,A.state,A.departureTime,B.nickname
			FROM 
			(SELECT * FROM orders WHERE state in (${stateArr}) ORDER BY ${sort} LIMIT ${beginRow},${pageSize} ) A 
			left join 
			(select id,nickname from user) B
			on A.applyUser = B.id;
		`
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
		const{ current, pageSize, item, data, state } = req.body;
		let stateArr = ''
		state.forEach((item, index) => {
			index < state.length - 1 ? stateArr = stateArr + `${item},` : stateArr = stateArr + item
		})
		const sort = 'createTime DESC';
		const beginRow = ( current - 1) * pageSize;
		let sql = `
			SELECT A.id,A.applyUser,A.createTime,A.departure,A.destination,A.approvalUser,A.approvalTime,A.driver,A.car,A.carryNum,A.state,A.departureTime,B.nickname
			FROM 
			(SELECT * FROM orders WHERE ${item} like "%${data}%" and state in (${stateArr}) ORDER BY ${sort} LIMIT ${beginRow},${pageSize} ) A 
			left join 
			(select id,nickname from user) B
			on A.applyUser = B.id;
		`
		db.query(sql, (err, result) => {
			if(err) throw err;
			let sql2 = `SELECT * from orders WHERE ${item} like "%${data}%" and state in (${stateArr})`;
			db.query(sql2, (err, total) => {
				res.json({code: 0, data: result, total: total.length});
			})
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 按日期搜索
router.post('/search/date', (req,res) => {
	try {
		const{ current, pageSize, date, state } = req.body;
		let stateArr = ''
		state.forEach((item, index) => {
			index < state.length - 1 ? stateArr = stateArr + `${item},` : stateArr = stateArr + item
		})
		const sort = 'createTime DESC';
		const beginRow = ( current - 1) * pageSize;
		let sql = `
			SELECT A.id,A.applyUser,A.createTime,A.departure,A.destination,A.approvalUser,A.approvalTime,A.driver,A.car,A.carryNum,A.state,A.departureTime,B.nickname
			FROM 
			(SELECT * FROM orders WHERE state in (${stateArr}) and date(departureTime) = '${date}' ORDER BY ${sort} LIMIT ${beginRow},${pageSize} ) A 
			left join 
			(select id,nickname from user) B
			on A.applyUser = B.id;
		`
		db.query(sql, (err, result) => {
			if(err) throw err;
			let sql2 = `SELECT * from orders WHERE date(departureTime) = '${date}' and state in (${stateArr})`;
			db.query(sql2, (err, total) => {
				res.json({code: 0, data: result, total: total.length});
			})
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
			if (data[i] !== undefined && data[i] !== '') {
				const end = index < Object.keys(data).length ? ',' : ''
				set = set + `${i}='${data[i]}'${end}`
				index++
			}
		}
		let sql = `UPDATE orders SET ${set}	WHERE id = ${id};`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: '修改成功'});
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 增加订单
router.post('/add', (req,res) => {
	try {
		const data = req.body.data;
		let colums = ''
		let val = ''
		let index = 1
		for(const i in data) {
			const end = index < Object.keys(data).length ? ',' : ''
			colums = colums + `${i}${end}`
			val = val + `'${data[i]}'${end}`
			index++
		}
		let sql = `insert into orders (${colums}) values (${val});`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: '增加成功'});
		})
	}
	catch (e) {
		res.json(e)
	}
})

// 删除订单
router.post('/delete', (req,res) => {
	try {
		const id = req.body.id;
		let sql = `DELETE FROM orders WHERE id = '${id}'`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: '删除成功'});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 订单表修改
router.post('/updateOrder', (req,res) => {
	try {
		let sql = `select * FROM orders WHERE state = ${state} ORDER BY ${sort} LIMIT ${beginRow},${pageSize};`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

// 订单表修改状态
router.post('/updateOrderState/id', (req,res) => {
	try {
		const { state, id } = req.body
		let sql = `update orders set state = ${state} where id = ${id};`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: '订单状态修改成功'});
	})
	}
	catch (e) {
		res.json(e)
	}
})

module.exports = router;