const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
// Path Configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

// Route Configuration
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Goyenk'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Johanes Adhitya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Help me Beibeh',
        helpText: 'Help pleaseeeee'
    })
})


// WEATHER API
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "Please add address data"
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    error
                })
            }
            res.send({
                response: "Success",
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help Not Found',
        errorMessage: 'Help Article Not Found'
    })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: "Please add search parameter"
        })
    } else if (!req.query.address) {
        res.send({
            error: "Please add address data"
        })
    } else {
        res.send({
            search: req.query.search,
            address: req.query.address,
            response: "Success",
            products: [{
                name: "Sepatu",
                ukuran: []
            }],
            address: 'Jl. Semarang'
        })
    }

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        errorMessage: 'Not Found'
    })
})

// Server Running
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})