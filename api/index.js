import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import MailJet from 'node-mailjet'

// NEW FROM TRAVERSY TUTORIAL ----------------------------------------------------------------

import * as ReactViews from 'express-react-views'
import multer from 'multer'
import * as GridFsStorage from 'multer-gridfs-storage'
import * as Grid from 'gridfs-stream'
import * as methodOverride from 'method-override'
import crypto from 'crypto'

// -------------------------------------------------------------------------------------------

// SUGGESTED FIX: '__dirname is not defined in ES module scope'
import path from 'path'
import { fileURLToPath } from 'url'

// SUGGESTED FIX: '__dirname is not defined in ES module scope'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const port = process.env.PORT

// Set View Engine
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', ReactViews.createEngine())

// Set CORS and connect
app.use(bodyParser.json()) // TRAVERSY
app.use(cors())
app.listen(port, () => console.log(`Server listening on port ${port}`))

// Conenct to MongoDB server
async function main() {
    await mongoose.connect(process.env.MONGOOSE_CONNECT)
}
// main.catch(err => console.log(err))

// MailJet configuration
const mailjet = MailJet.apiConnect(
    process.env.MAIL_KEY,
    process.env.MAIL_SECRET
)

app.get('/getShow', function(req, res){
    res.send('GET SHOW')
})

app.get('/postShow', function(req, res){
    res.render('index', {})
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

