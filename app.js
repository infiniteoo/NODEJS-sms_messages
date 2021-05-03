const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')
const Vonage = require('@vonage/server-sdk')
require('dotenv').config()



const vonage = new Vonage({
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
})