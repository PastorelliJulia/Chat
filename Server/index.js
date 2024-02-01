const { log } = require('console')
const { disconnect } = require('process')

const app = require ('express')()
const Server = require('http').createServer(app)
const io = require('socket.io')(Server, {cors: {origin: 'http://localhost:5173'}})

const PORT = 3001

io.on('connection', socket => {
    console.log("Usuário conectado", socket.id)

    socket.on('set_username', username => {
        socket.data.username = username

        socket.on('disconnect', reason => {
            console.log('Usuário desconectado', socket.id);
        })
    })

    socket.on('message', text => {
        io.emit('receive_message', {
            text, 
            authorId: socket.id,
            author: socket.data.username
        })
    })
})

Server.listen(PORT, () => console.log('tá funfando viu'))