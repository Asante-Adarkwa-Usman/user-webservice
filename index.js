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

//Fetching a user by id
app.get('/users/:id', async (req, res) => {
  const {id} = req.params
  const user = await UserModel.findById(id)
  if (user){
    res.status(200).json({
        data: user,
        message: 'User fetched successfully'
    })
} else {
    res.json({
        message: 'Unable to fetch user'
    })
}

})

// Creating a user
app.post('/user', async (req, res) => {
 const {userName, email, password} = req.body
 const newUser = await UserModel.create({
    userName,
    email,
    password
 })
 if (newUser){
    res.status(200).json({
        data: newUser,
        message: 'User created successfully'
    })
} else {
    res.json({
        message: 'Unable to create user'
    })
}
})

//Update user userName and email address
app.patch('/users/:id', async (req, res) => {
   const {id} = req.params
   const {userName, email} = req.body

   const updateUser = await UserModel.updateOne({
    userName,
    email
   }).where({id:id})
  
   if (updateUser){
    res.status(200).json({
        data: updateUser,
        message: 'User updated successfully'
    })
} else {
    res.json({
        message: 'Unable to update user credentials'
    })
}

})

//Delete a user
app.delete('/users/:id', async (req, res) => {
     const {id} = req.params
    const deletedUser = await UserModel.findByIdAndDelete(id)

    if (deletedUser){
        res.status(200).json({
            data: deletedUser,
            message: 'User deleted successfully'
        })
    } else {
        res.json({
            message: 'Unable to delete user'
        })
    }

})
























app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

