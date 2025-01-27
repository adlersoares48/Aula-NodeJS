// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Hello Word')

//     return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

server.post('/videos', (req, res) => {
    //request body
    const { title, description, duration } = req.body
    database.create({
        title,
        description,
        duration
    })
    return res.status(201).send()
})

server.get('/videos', () => {
    const videos = database.list()
    console.log(videos)
    return videos
})

//Route parameter (:id) - usado no final da rota pelo metodo PUT e DELETE 
//para dizer o id do que exatamente eu preciso atualizar/excluir
server.put('/videos/:id', (req, res) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body
    database.update(videoId, {
        title,
        description,
        duration
    })
    return res.status(204).send()
})

server.delete('/videos/:id', (req, res) => {
    const videoId = req.params.id
    database.delete(videoId)
    return res.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333
})