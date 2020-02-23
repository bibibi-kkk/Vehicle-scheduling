const mysql = require('mysql')

const db = mysql.createConnection({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'366322zmt',
	database:'vehicle_scheduling'
})

module.exports = db