const db = require('../../connect')
const express = require('express')
const router = express.Router()

// 根据用户id获取司机信息
router.post('/getDriver/id', (req,res) => {
	try {
		const id = req.body.id
		let sql = `select * FROM driver WHERE userId = '${id}'`;
		db.query(sql, (err, result) => {
			if(err) throw err;
			res.json({code: 0, data: result});
	})
	}
	catch (e) {
		res.json(e)
	}
})

module.exports = router;