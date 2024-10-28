const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//database
mongoose.connect('mongodb+srv://nobu:495Y8WWVbY1rr3zF@cluster0.hvsbriu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
{
    dbName:"BhimKatta",
}).catch((err) => console.log(err))

//DB schema and model
const postSchema = mongoose.Schema({
    title: String,
    position: String,
    description: String,
    status: String,
    location: String,
    applyLink:String,
})

const Post = mongoose.model("jobs", postSchema)

//api routes
app.get('/', (req, res) => {
    res.send("Express is here")
})

app.post('/create', (req, res) => {
    Post.create({
        title: req.body.title,
        position:req.body.title,
        description: req.body.description,
        status: req.body.status,
        location: req.body.location,
        applyLink: req.body.applyLink,
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err))
})

app.get('/posts', (req, res) => {
    Post.find().then((items) => res.json(items)).catch((err) => console.log(err))
})

app.delete('/delete/:id', (req, res) => {
    Post.findByIdAndDelete({ _id: req.params.id }).then(doc => console.log(doc)).catch(err => console.log(err))
})

app.put('/update/:id', (req, res) => {
    Post.findByIdAndUpdate({ _id: req.params.id }, { title: req.body.title, position: req.body.position , description: req.body.description, status: req.body.status, location: req.body.location , applyLink:req.body.applyLink }).then(doc => console.log(doc)).catch(err => console.log(err))
})

app.listen(3001, function () {
    console.log("Server is running")
})

