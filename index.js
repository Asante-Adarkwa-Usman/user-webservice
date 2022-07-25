import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { UserModel } from './schema/UserSchema.js'
import cors from 'cors'

//dotenv config
dotenv.config()

const app = express()

app.use(express.json())

//cors middleware
app.use(cors())


const PORT = 3000 || process.env.PORT 

const db = process.env.DB_URL

//Connecting to mongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB')
})



//landing page
app.get('/', (req, res) => {
  res.send('Welcome to user webservice')
})

//Get all users
app.get('/users', async  (req, res) => {
    const users = await UserModel.find({})
    if (users){
        res.status(200).json({
            data: users,
            message: 'Users fetched successfully'
        })
    } else {
        res.json({
            message: 'Unable to fetch users'
        })
    }
})




















app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

