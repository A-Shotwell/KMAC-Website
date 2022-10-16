import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import MailJet from 'node-mailjet'

// NEW FROM TRAVERSY TUTORIAL ----------------------------------------------------------------

import * as ReactViews from 'express-react-views'
import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import methodOverride from 'method-override'
import crypto from 'crypto'

// -------------------------------------------------------------------------------------------

// SUGGESTED FIX for: '__dirname is not defined in ES module scope'
import path from 'path'
import { fileURLToPath } from 'url'

// SUGGESTED FIX for: '__dirname is not defined in ES module scope'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const port = process.env.PORT

// Set View Engine
// TRAVERSY: May choose an alternate method...
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', ReactViews.createEngine())

// Set CORS and connect
app.use(bodyParser.json()) // TRAVERSY
app.use(methodOverride('_method')) // TRAVERSY, set to use query string for database item deletion
app.use(cors())
app.listen(port, () => console.log(`Server listening on port ${port}`))

const conn = mongoose.createConnection(process.env.MONGOOSE_CONNECT)

// Init GFS
let gfs;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('shows')
})

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGOOSE_CONNECT,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'shows'
                }
                resolve(fileInfo);
            })
        })
    }
})
const upload = multer({ storage })

// MailJet configuration
const mailjet = MailJet.apiConnect(
    process.env.MAIL_KEY,
    process.env.MAIL_SECRET
)

// TRAVERSY: May choose an alternate method...
app.get('/newShow', function(req, res){
    res.render('index', {})
})

app.post('/uploadShow', upload.single('image'), function (req, res) {    
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

    // ACCESS BODY, UPLOAD TO MONGODB DATABASE
    console.log({
        TITLE: req.body.eventTitle,
        LOCATION: req.body.location,
        DATE: newDate,
        TIME: newTime,
        TICKET: req.body.ticket,
        DESC: req.body.desc,
        IMAGE: req.body.image // EMPTY FILE LIST OBJECT. WHY? ACTUALLY RETURNING STRING: '[object FileList]'
    })

    res.status(200)
    res.send("FORM RECIEVED")
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

