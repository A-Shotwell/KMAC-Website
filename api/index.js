import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import MailJet from 'node-mailjet'
import multer from 'multer'

// SUGGESTED FIX for: '__dirname is not defined in ES module scope'
import path from 'path'
import { fileURLToPath } from 'url'

// Create Show schema and model
const showSchema = new mongoose.Schema({
    eventTitle: String,
    location: String,
    date: String,
    time: String,
    ticket: String,
    desc: String,
    image: String
})

const Show = mongoose.model('Show', showSchema)

// SUGGESTED FIX for: '__dirname is not defined in ES module scope'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const port = process.env.PORT

// Set CORS and connect
app.use(cors()) 
app.listen(port, () => console.log(`Server listening on port ${port}`))

mongoose.connect(process.env.MONGOOSE_CONNECT)

// Create storage engine
const upload = multer()

// MailJet configuration
const mailjet = MailJet.apiConnect(
    process.env.MAIL_KEY,
    process.env.MAIL_SECRET
)

// Upload new show 
app.post('/uploadShow', upload.single(), async function (req, res) {    
    // Convert date
    const dateParts = req.body.date.split('-')
    dateParts.push(dateParts.shift())
    const newDate = dateParts.join('-')

    // Convert time
    const timeParts = req.body.time.split(":")
    const daylight = timeParts[0] < 12 ? " AM" : " PM"
    timeParts[0] !== "12" && parseInt(timeParts[0]) !== 0 
    ? timeParts.unshift(timeParts.shift() % 12) 
    : timeParts[0] = "12"
    const newTime = timeParts.join(":") + daylight

    // ACCESS BODY, CONFORM TO SCHEMA
    const newShow = new Show({
        eventTitle: req.body.eventTitle,
        location: req.body.location,
        date: newDate,
        time: newTime,
        ticket: req.body.ticket,
        desc: req.body.desc,
        image: req.body.image
    })

    // UPLOAD TO MONGODB DATABASE
    try {
        await newShow.save()
        console.log('SHOW SAVED')
        res.status(200).send('FORM RECEIVED')
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

    
})

app.get('/getShows', bodyParser.json(), async function (req, res){
    try {
        const allShows = await Show.find()
        res.status(200).send(allShows)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }    
})

app.post('/contact', bodyParser.json(), function(req, res){
    console.log(req.body)

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