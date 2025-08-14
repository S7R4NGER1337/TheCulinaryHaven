const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')

app.use(express.urlencoded())
app.use(express.json())

router.get('/get', (req,res) => {
    res.send('Hello')
})

mongoose.connect('mongodb://localhost:27017/TheCulinaryHaven')
    .then(() => console.log('Db connected'))
    .catch(error => console.log(error))

app.use(router)
app.listen(3030, () => console.log('test'))