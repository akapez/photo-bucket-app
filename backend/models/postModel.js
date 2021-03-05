import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    selectedFile: {
        type: String,
        required: true,        
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

const Post = mongoose.model('Post', postSchema) 

export default Post