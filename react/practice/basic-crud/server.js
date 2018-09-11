const express = require('express')
const path = require('path')
const mongo = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./config.js')

const app = express()
const port = process.env.port || 7777
const srcpath = path.join(__dirname, '/public')

app.use(express.static('public'))
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

const Schema = mongo.Schema
const studentSchema = new Schema({
    name: { type: String },
    address: { type: String },
    email: { type: String },
    contact: { type: String },
}, { versionKey: false })

const model = mongo.model('student', studentSchema, 'student')

// get data from database
app.get('/api/getdata', (req, res) => {
    model.find({},
        (err, data) => {
            if (err) { res.send(err) }
            else { res.send(data) }
        })
})

// delete data from database
app.post('/api/Removedata', (req, res) => {
    model.remove(
        { _id: rea.body.id, },
        (err) => {
            if (err) { res.send(err) }
            else { res.send({ data: 'Record has been Deleted' }) }
        })
})


// updata data from database
app.post('/api/Updatedata', (req, res) => {
    model.findOneAndUpdate(
        req.body.id,
        {
            name:  req.body.name,
            address: req.body.address,
            contact: req.body.contact,
            email:req.body.email
        },
        (err) => {
            if (err) { res.send(err) }
            else { res.send({ data: 'Record has been Updated' }) }
        })
})

// insert data from database
app.post("/api/savedata", (req,res) => {
    const mod = new model(req.body)

    mod.save((err, data) => {
        if (err) { res.send(err) }
        else { res.send({ data:'Record has been Inserted' }) }
    })
})

// call by default index.html
app.get('*', (req, res) => {
    res.sendFile(srcpath + '/index.html')
})

// server stat on given port
app.listen(port,function(){
    console.log('server start on port' + port)
})
