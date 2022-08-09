require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const PORT = 8000
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN
const GITHUB_API = process.env.REACT_APP_GITHUB_URL

const appExpress = express()
appExpress.use(cors())

appExpress.listen(PORT, () => console.log(`Server running on port ${PORT}`)).on('error', (err) => console.log('BIG ERRORW', err) )


// appExpress.get('/token', (req, res, next) => {
//     console.log('TOKEN HIT');
//    res.json({token: TOKEN})
// })


appExpress.get('/search/users', (req, res, next) => {
    const url2 = GITHUB_API + req.url 
    axios.request(url2, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
    }).then(data => {
        console.log('HEADER RATE LIMIT /search/users', data.headers['x-ratelimit-limit'])
        console.log('HEADER RATE REMAINING /search/users', data.headers['x-ratelimit-remaining'])
        res.status(data.status)
        res.json(data.data)
    }).catch(function (error) {
        console.log('ERRORSEARCH', error);
        if(error.response){
            res.status(error.response.status)
            res.json(error)
        }
        else{
            next(error)
        }
    })
})


appExpress.get('/users/:login', (req, res, next) => {
    const url2 = GITHUB_API + req.url

    axios.request(url2, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
    }).then(data => {
        console.log('HEADER RATE LIMIT /users/:login', data.headers['x-ratelimit-limit'])
        console.log('HEADER RATE REMAINING /users/:login', data.headers['x-ratelimit-remaining'])
        res.status(data.status)
        res.json(data.data)
    }).catch(function (error) {
        console.log('ERRORSEARCH', error);
        if(error.response){
            res.status(error.response.status)
            res.json(error)
        }
        else{
            next(error)
        }
    })
})

appExpress.get('/users/:login/repos', (req, res, next) => {
    const url2 = GITHUB_API + req.url 
    axios.request(url2, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
    }).then(data => {
        console.log('HEADER RATE LIMIT /users/:login/repos', data.headers['x-ratelimit-limit'])
        console.log('HEADER RATE REMAINING /users/:login/repos', data.headers['x-ratelimit-remaining'])
        res.status(data.status)
        res.json(data.data)
    }).catch(function (error) {
        console.log('ERRORSEARCH', error);
        if(error.response){
            res.status(error.response.status)
            res.json(error)
        }
        else{
            next(error)
        }
    })
})