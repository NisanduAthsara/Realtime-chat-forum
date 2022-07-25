const Message = require('./model/messages.model')
const jwt = require('jsonwebtoken')
const User = require('./model/user.model')

module.exports = (io)=>{
    io.on('connection',async(socket)=>{
        let allMessages = await Message.find()
        socket.emit('message',allMessages)
        socket.on('message',async ({message,token})=>{
            let decodeToken
            let name
            try {
                decodeToken = jwt.verify(token,process.env.TOKEN_KEY)
                name = await User.findById(decodeToken.id)
                if(!name){
                    socket.emit('error','invalid token')
                }
                name = name.username
                const Schema = new Message({
                    name,message
                })
                const data = await Schema.save() 
                let allMessages = await Message.find()  
                io.emit('message',allMessages)
            } catch (error) {
                socket.emit('error','invalid token')
            }   
        })
    })
}