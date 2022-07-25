const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http,{cors:{origin:"*"}})
const db = require('./utils/db')
const Message = require('./model/messages.model')
require('dotenv/config')
const socket_page = require('./socket')(io)
const routes = require('./routes/user.routes')
const bodyparser = require('body-parser')
const cors = require('cors')

app.use(cors({
    origin:'*',
    credentials:true
}))
app.use(bodyparser.json())
db.connect()

app.use(routes)

http.listen(8080,()=>{
    console.log('http://localhost:8080')
})