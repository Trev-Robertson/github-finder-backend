require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const PORT = 8000
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const appExpress = express()
appExpress.use(cors())

appExpress.listen(PORT, () => console.log(`Server running on port ${PORT}`))

appExpress.get('/token', (req, res) => {
   res.json({token: TOKEN})
})


appExpress.get('/search_users', (req, res) => {
    const search_term = req.query.q 
    const noTermUrl = 'https://api.github.com/search/users?q=\'\''
    const url = `https://api.github.com/search/users?q=${search_term}`

    axios.request(search_term ? url : noTermUrl, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
    }).then(data => {
        // console.log('HEADER RATE LIMIT', data.headers['x-ratelimit-limit'])
        // console.log('HEADER RATE REMAINING', data.headers['x-ratelimit-remaining'])
        res.json(data.data)
    }).catch(function (error) {
        console.log("ERROR", error);
    })
})


