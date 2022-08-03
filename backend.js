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
    // const url = req.query.url ?? ""
    let result
    // console.log('OBJEXCT', req);
    const search_term = req.query.q 
    const noTermUrl = 'https://api.github.com/search/users?q=\'\''
    const url = `https://api.github.com/search/users?q=${search_term}`
    console.log("url", url)


        axios.request(search_term ? url : noTermUrl).then(data => {
            console.log('USERDATA', data.data)
            res.json(data.data)
            // result = data.data
            return data.data
        }).catch(function (error) {
            // handle error
            // res.json({error: error})
            console.log(error);
        })

        
    // axios.get(url, {
    //     headers: {
    //         Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    //     }
    // }).then((data) => {
    //     console.log(data?.data)
    // // res.json(data.data)
    // res.json(data.data)

    // }).catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })

})

// appExpress.get('/', (req, res) => {
//     axios.get('https://api.github.com/search/users?q=trev-ro').then(data => console.log(data))
// })
