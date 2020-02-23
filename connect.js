const mysql = require('mysql')

const db = mysql.createConnection({
	host:'db4free.net',
	port:'3306',
	user:'sillyknight02',
	password:'Zs970529dd',
	database:'vehicle_scheduli'
})

module.exports = db