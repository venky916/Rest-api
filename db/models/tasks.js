const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }},
    {
        timestamps: true,
        toJSON: {virtuals: true},
        // toObject: { virtuals: true }
    }   
)

const Task = mongoose.model('Task',taskSchema)

module.exports = Task