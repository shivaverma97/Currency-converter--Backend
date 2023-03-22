if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const currencyRoute = require('./routes/currencyRoute')
const corsOptions = {
    origin: '*',
    credentials : true,
    optionSuccessStatus : 200
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(cors(corsOptions))
app.use('/', currencyRoute)

app.listen(5000 || process.env.PORT, () => console.log('server active'))
