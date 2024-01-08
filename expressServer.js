const Contenedor = require('./contenedor');
const express = require ('express');
const app = express();

const PORT = 8080;
const contenedor = new Contenedor('productos.txt')

app.get('/', (req, res) => {

    res.send('Hello EXPRESS STORE')

})

app.get('/productos', async(req, res) => {

    const allProducts = await contenedor.getAll()
    res.send(allProducts)

})

app.get('/productRandom', async (req, res) => {

    const allProducts  = await contenedor.getAll()
    const maxId = allProducts.length; 

    const randomNumber = generateRandomNumber(1, maxId)
    console.log(randomNumber)
    const randomProduct = await contenedor.getById(randomNumber)

    res.send(randomProduct)

})

const generateRandomNumber = (max) => {

    return Math.floor((Math.random() *  10000))

}

const server = app.listen(PORT, ()=> {

    console.log (`SERVER IS RUNNING ON: http://localhost:${PORT}`)

})

server.on('error', (error) => console.log(error))