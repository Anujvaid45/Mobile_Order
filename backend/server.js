require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const AuthRoutes = require('./routes/authRoute.js')
// const categoryRoutes = require('./routes/categoryRoutes.js')
const productRoutes = require('./routes/productRoute.js')
const app = express()

app.use(cors());

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',AuthRoutes)
app.use('/api/v1/product',productRoutes)



//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Mobile Ordering Application app</h1>")
})

//connect to db
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
        console.log(`connected to db&listening on port ${process.env.PORT}`)
    })

})
.catch((err)=>{
    console.log(`${err}`)
})
