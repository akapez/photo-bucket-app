import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/user.js'
import posts from './data/posts.js'
import User from './models/userModel.js'
import Post from './models/postModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async  () => {
    try {
        await User.deleteMany()
        await Post.deleteMany()

        await User.insertMany(users)
        await Post.insertMany(posts)

        console.log('Data Imported!');
        process.exit()
    }catch(error) {
        console.log(`${error}`)
        process.exit(1)
    }
}

const destroyedData = async  () => {
    try {
        await User.deleteMany()
        await Post.deleteMany()

        console.log('Data Destroyed!');
        process.exit()
    }catch(error) {
        console.log(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === "-d") {
    destroyedData()
  } else {
    importData()
  }