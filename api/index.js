import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const port = process.env.PORT
app.listen(port, () => console.log(`Server listening on port ${port}`))

async function main() {
    await mongoose.connect(process.env.MONGOOSE_CONNECT)
}
// main.catch(err => console.log(err))

// EMAIL SERVICE TRANSPORTER
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

app.get('/getShow', function(req, res){
    res.send('GET SHOW')
})

app.post('/postShow', function(req, res){
    res.send('POST SHOW')
})

app.get('/contact', function(req, res){
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'aaronspleasantnightmares@gmail.com',
        subject: 'TEST CONTACT',
        text: 'TEST CONTACT SUCCESSFUL'
    }

    transporter.sendMail(mailOptions, function(error, info){
        error ? console.log(error) : console.log('Email sent: ' + info.response)
    })

    res.send('CONTACT SENT')
})

app.post('booking', function(req, res){
    res.send('BOOKING')
})

