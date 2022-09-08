require('dotenv').config()
const { createServer } = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const xssClean = require('xss-clean')
// const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const rfs = require('rotating-file-stream')
const path = require('path')
const fileUpload = require('express-fileupload')
require('colors')

const errorHandler = require('./middleware/error')

const testApiRoute = require('./routes/routs')

const port = process.env.PORT || 5000

const app = express()

// Set security headers
app.use(helmet())

// Prevent xss attacks
app.use(xssClean())

// Rate limiting (100 requests per 1 minute)
// app.use(rateLimit({
//     windowMs: 60 * 1000,
//     max: 60
// }))

// Prevent http param pollution
app.use(hpp())

// Enable Cors
app.use(cors())

app.use((req, res, next) => {
    res.flush = function () { /* Do nothing */ }
    next();
})

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
})
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(fileUpload())

app.use('/web/allure', express.static(path.join(__dirname, 'allure-reports')))
app.use('/web/html', express.static(path.join(__dirname, 'allure-reports')))
app.use('/api/allure', testApiRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'face/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'face', 'build', 'index.html')))
    console.log('Production build starting')
}

app.use(errorHandler)

const server = createServer(app)
server.listen(port, () => {
    console.log(`Listening for events on ${server.address().port}`)
})

// Handel unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`.red)
    // Close server and exit process
    server.close(() => process.exit(1))
})
