const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')
const Vonage = require('@vonage/server-sdk')
require('dotenv').config()

// Init Nexmo
const nexmo = new Nexmo({
    apiKey: process.env.SMS_API_KEY,
    apiSecret: process.env.SMS_API_SECRET
})

// Init the app

const app = express();

// template engine setup
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

// public folder setup
app.use(express.static(__dirname + '/public'))

// Body Parser middleware - pretty sure this isnt needed
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// index route
app.get('/', (req, res) => {
    res.render('index')
})

// catch form submit

app.post('/', (req, res) => {
   /*  console.log(req.body)
    res.send(req.body) */
    const to = req.body.number
    const text = req.body.text
    const from = "18336535404"
    

    nexmo.message.sendSms(from, to, text, { type: 'unicode' },
    (err, responseData) => {
        if(err){
            console.log(err)
        } else {
            console.dir(responseData)
        }
    }



    )
})

// define port
const port = 3000

//start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`))


/* const vonage = new Vonage({
  apiKey: process.env.SMS_API_KEY,
  apiSecret: process.env.SMS_API_SECRET
})

const from = "18336535404"
const to = "16127079733"
const text = 'environment variables are set up!'

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
}) */