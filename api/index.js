/*
PROBLEM: Sending email in this fashion is a violation of terms of service. Spam. Find alternate method.
*/

import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import cors from 'cors'
import bodyParser from 'body-parser'
import MailJet from 'node-mailjet'

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(cors())
app.listen(port, () => console.log(`Server listening on port ${port}`))

async function main() {
    await mongoose.connect(process.env.MONGOOSE_CONNECT)
}
// main.catch(err => console.log(err))

// EMAIL SERVICE TRANSPORTER (ATTEMPTING SMTP)
// const transporter = nodemailer.createTransport({
//     host: "in-v3.mailjet.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS
//     }
// })

//MAILJET CONFIGURATION
const mailjet = MailJet.apiConnect(
    process.env.MAIL_KEY,
    process.env.MAIL_SECRET
)

app.get('/getShow', function(req, res){
    res.send('GET SHOW')
})

app.post('/postShow', function(req, res){
    res.send('POST SHOW')
})

app.post('/contact', bodyParser.json(), function(req, res){
    console.log(req.body)
    // const mailOptions = {
    //     from: process.env.EMAIL,
    //     to: 'aaronspleasantnightmares@gmail.com',
    //     subject: `NEW CONTACT from ${req.body.name}`,
    //     text: `${req.body.name} writes regarding ${req.body.reason}:\n\n\t${req.body.message}\n\nCONTACT INFO:\n\t${req.body.email}\n\t${req.body.phone}`
    // }

    // transporter.sendMail(mailOptions, function(error, info){
    //     error ? console.log(error) : console.log('Email sent: ' + info.response)
    // })

    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: process.env.SENDER_EMAIL,
                    Name: 'KMAC Music'
                },
                To: [
                    {
                        Email: process.env.RECIPIENT_EMAIL,
                        Name: 'KMAC Music Contact Inbox'
                    }
                ],
                Subject: `NEW CONTACT from ${req.body.name}`,
                TextPart: `${req.body.name} writes regarding ${req.body.reason}:\n\n\t${req.body.message}\n\nCONTACT INFO:\n\t${req.body.email}\n\t${req.body.phone}`,
                HTMLPart: null,
            },
        ],
    })
    request
        .then(result => {
            console.log(result.body)
        })
        .catch(err => {
            console.log(err.statusCode)
        })
})

app.post('/booking', bodyParser.json(), function(req, res){
    console.log(req.body)
    let day = new Date(req.body.date).toLocaleDateString('en-us', {weekday: "long", year: "numeric", month: "short", day: "numeric"})

    const timeFunc = (dateString) => {
        const timeArr = dateString.split(':')
        const hour = Number(timeArr[0]) % 12
        const ampm = Number(timeArr[0]) < 12 || Number(timeArr[0]) === 24 ? 'AM' : 'PM'

        return `${hour}:${timeArr[1]} ${ampm}`
    }

    // const mailOptions = {
    //     from: process.env.EMAIL,
    //     to: 'aaronspleasantnightmares@gmail.com',
    //     subject: `NEW BOOKING from ${req.body.name}`,
    //     text: `${req.body.name} would like to book your services!\n\n\tDATE: ${day}\n\tTIME: ${timeFunc(req.body.time)}\n\tDESCRIPTION:\n\t\t${req.body.description}\n\n\tCONTACT INFO:\n\t\t${req.body.email}\n\t\t${req.body.phone}`
    // }

    // transporter.sendMail(mailOptions, function(error, info){
    //     error ? console.log(error) : console.log('Email sent: ' + info.response)
    // })
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: process.env.SENDER_EMAIL,
                    Name: 'KMAC Music'
                },
                To: [
                    {
                        Email: process.env.RECIPIENT_EMAIL,
                        Name: 'KMAC Music Contact Inbox'
                    }
                ],
                Subject: `NEW bOOKING REQUEST from ${req.body.name}`,
                TextPart: `${req.body.name} would like to book your services!\n\n\tDATE: ${day}\n\tTIME: ${timeFunc(req.body.time)}\n\tDESCRIPTION:\n\t\t${req.body.description}\n\n\tCONTACT INFO:\n\t\t${req.body.email}\n\t\t${req.body.phone}`,
                HTMLPart: null,
            },
        ],
    })
    request
        .then(result => {
            console.log(result.body)
        })
        .catch(err => {
            console.log(err.statusCode)
        })
})

