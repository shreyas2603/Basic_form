var express=require("express")
var mongoose=require("mongoose")
var bodyParser=require("body-parser")
const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect("mongodb://localhost:27017/student")
var db=mongoose.connection
db.on('error',()=>console.log('error connection'))
db.once('open',()=>console.log('connected db'))
app.post('/sign-up',(req, res)=>{
    var student_name=req.body.student_name
    var course=req.body.course
    var age=req.body.age
    var email=req.body.email
    
    var data={
        "student_name":student_name,
        "course":course,
        "age":age,
        "email":email
    }
    db.collection('form').insertOne(data, (err,collection)=>{
        if(err){
            throw err;
        }
        console.log("document inserted successfully")
    })
    return res.redirect('signup_success.html')
})
app.get('/',(req, res)=>{
    return res.redirect('index.html')
}).listen(3000);
console.log("Listening")