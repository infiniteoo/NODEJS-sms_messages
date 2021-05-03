const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')
const Vonage = require('@vonage/server-sdk')




const vonage = new Vonage({
  apiKey: "d1c37032",
  apiSecret: "47e6Y9DspZy4urrO"
})

const from = "18336535404"
const to = "16127079733"
const text = 'A text message sent using the Vonage SMS API'

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