require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const PORT = 8000
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN
const GITHUB_API = process.env.REACT_APP_GITHUB_URL

const appExpress = express()
appExpress.use(cors())

appExpress.listen(PORT, () => console.log(`Server running on port ${PORT}`))


// appExpress.get('/token', (req, res, next) => {
//     console.log('TOKEN HIT');
//    res.json({token: TOKEN})
// })


appExpress.get('/search/users', (req, res, next) => {
    const url2 = GITHUB_API + req.url
    // console.log('URL2', url2);
    axios.request(url2, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
    }).then(data => {
        console.log('HEADER RATE LIMIT', data.headers['x-ratelimit-limit'])
        console.log('HEADER RATE REMAINING', data.headers['x-ratelimit-remaining'])
        res.json(data.data)
    }).catch(function (error) {
        res.status(error.response.status)
        res.json(error)
    })
})


appExpress.get('/users/:login', (req, res, next) => {
    const url2 = GITHUB_API + req.url

    axios.request(url2, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
    }).then(data => {
        console.log('HEADER RATE LIMIT', data.headers['x-ratelimit-limit'])
        console.log('HEADER RATE REMAINING', data.headers['x-ratelimit-remaining'])
        res.json(data.data)
    }).catch(function (error) {
        res.status(error.response.status)
        res.json(error)
    })
})