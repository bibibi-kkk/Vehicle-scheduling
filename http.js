const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

// create application/json parser
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Method', 'post')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

//web端接口
app.use('/web', require('./serve/web'))

app.listen(8080)