import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

async function main() {
    await mongoose.connect(process.env.MONGOOSE_CONNECT)
}

app.get('/getShow', (req, res) => {
    res.send('GET SHOW')
})

app.post('/postShow', (req, res) => {
    res.send('POST SHOW')
})

app.post('contact', (req, res) => {
    res.send('CONTACT')
})

app.post('booking', (req, res) => {
    res.send('BOOKING')
})

