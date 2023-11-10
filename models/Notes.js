//schema/blueprint of user's Notes, how it should look and be given values

const mongoose=require('mongoose')
const { Schema } = mongoose;

const noteSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'  //means kis note ko kis user k sath link krna hai
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    doneTask:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const notes = mongoose.model("Notes", noteSchema);
module.exports = notes;
