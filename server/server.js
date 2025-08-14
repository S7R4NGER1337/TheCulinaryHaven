const express = require('express')
const app = express()
const router = express.Router()


app.use(express.urlencoded())
app.use(express.json())

router.get('/x', (req,res) => {
    console.log(1);
    
    res.send('Hello')
})

app.use(router)
app.listen(3030, () => console.log('test'))