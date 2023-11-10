//our database connected to our myDiary app

const mongoose=require('mongoose')
const mongoURI='mongodb://localhost:27017/mydiary'

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('Connected to Mongoose Successfully');
    })
}
module.exports=connectToMongo;