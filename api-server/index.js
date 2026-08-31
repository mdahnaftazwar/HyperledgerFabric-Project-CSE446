/*
 * Module dependencies
 */
const express = require('express')
const cors = require('cors')
const query = require('./query');
const createIdentity = require('./createIdentity')
const updateClearance = require('./updateClearance')
const bodyParser = require('body-parser')
const filterIdentity = require('./filterIdentity');


const app = express()

// To control CORSS-ORIGIN-RESOURCE-SHARING( CORS )
app.use(cors())
app.options('*', cors()); 

// To parse encoded data
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


// get all identities
app.get('/get-identity', function (req, res) {
    query.main( req.query )
    .then(result => {
        const parsedData = JSON.parse( result )
        let identityList

        // if user search identity
        if(  req.query.key ){
            identityList = [
                {
                    Key: req.query.key,
                    Record: {
                        ...parsedData
                    }
                }
            ]
            res.send( identityList )
            return
        }

        identityList = parsedData
        res.send( identityList )
    })
    .catch(err => {
        console.error({ err })
        res.send('FAILED TO GET DATA!')
    })
})

// create a new identity
app.post('/create', function (req, res) {
    createIdentity.main( req.body  )
    .then(result => {
        res.send({message: 'Created successfully'})
    })
    .catch(err => {
        console.error({ err })
        res.send('FAILED TO LOAD DATA!')
    })
})

// update clearance status
app.post('/update', function (req, res) {
    updateClearance.main( req.body  )
    .then(result => {
        res.send({message: 'Updated successfully'})
    })
    .catch(err => {
        console.error({ err })
        res.send('FAILED TO LOAD DATA!')
    })
})

// filter identities via CouchDB
app.get('/filter-identity', function (req, res) {
    filterIdentity.main( req.query )
    .then(result => {
        const parsedData = JSON.parse( result );
        res.send( parsedData );
    })
    .catch(err => {
        console.error({ err });
        res.status(500).send('FAILED TO FILTER DATA!');
    })
});

app.listen(3000, () => console.log('Server is running at port 3000'))