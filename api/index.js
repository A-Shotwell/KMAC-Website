import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(cors())
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

app.post('/contact', bodyParser.json(), function(req, res){
    console.log(req.body)
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'aaronspleasantnightmares@gmail.com',
        subject: `NEW CONTACT from ${req.body.name}`,
        text: `${req.body.name} writes regarding ${req.body.reason}:\n\n\t${req.body.message}\n\nCONTACT INFO:\n\t${req.body.email}\n\t${req.body.phone}`
    }

    transporter.sendMail(mailOptions, function(error, info){
        error ? console.log(error) : console.log('Email sent: ' + info.response)
    })
    res.send('SENT CONTACT EMAIL SUCCESSFULLY')
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

    const mailOptions = {
        from: process.env.EMAIL,
        to: 'aaronspleasantnightmares@gmail.com',
        subject: `NEW BOOKING from ${req.body.name}`,
        text: `${req.body.name} would like to book your services!\n\n\tDATE: ${day}\n\tTIME: ${timeFunc(req.body.time)}\n\tDESCRIPTION:\n\t\t${req.body.description}\n\n\tCONTACT INFO:\n\t\t${req.body.email}\n\t\t${req.body.phone}`
    }

    transporter.sendMail(mailOptions, function(error, info){
        error ? console.log(error) : console.log('Email sent: ' + info.response)
    })
    res.send('BOOKING')
})

