require("./db/connection")
const express =require("express")

const user_router =require("./routers/user_router")
const task_router =require("./routers/task_router")

const app =express()

app.use(express.json())

app.use(user_router)
app.use(task_router)

const port =process.env.PORT || 3000

app.listen(port)

// const Task =require("./db/models/tasks")
// const User =require("./db/models/users")
// const myFunction = async () =>{
//     const task = await Task.findById("656cc42928cac0d291006491")
//     console.log(task.owner)
//     await task.populate('owner')
//     console.log(task)
    // const user =await User.findById('656cc03dc416d684757df513')
    // await user.populate('task')
    // console.log(user)
// }
// myFunction()


// const multer = require('multer')

// const upload = multer(
//     {
//         dest:"upload",
//         limits:{
//             fileSize:10000000,
//         },
//         fileFilter(req,file,cb){
//             // console.log(file.originalname)
//             if (!file.originalname.endsWith('.jpg'))
//             return cb(new Error ('File format is incorrect'))
//         cb(undefined,true)
//         }
//     }
// )

// app.post('/upload',upload.single('upload'),async (req,res)=>{
//     res.send()
// },(err,req,res,next)=>{
//     res.status(404).send({error: err.message})
// })